"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

export interface PixelMorphProps {
  scrollProgress: number; // 0.0 to 1.0
  isDark?: boolean;
  onStageChange?: (stage: number, stageProgress: number, isMorphing: boolean) => void;
  className?: string;
}

const STAGE_IMAGES = [
  "/images/morph/arch_stage_1.png",
  "/images/morph/arch_stage_2.png",
  "/images/morph/arch_stage_3.png",
  "/images/morph/arch_stage_4.png",
];

const VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;

  uniform sampler2D uTexture1;
  uniform sampler2D uTexture2;
  uniform float uProgress;          // 0.0 to 1.0 transition progress
  uniform vec2 uResolution;         // Screen/canvas resolution in pixels
  uniform vec2 uImageResolution;    // Native image resolution (1024, 1024)
  uniform float uTime;              // Elapsed time for subtle shimmer
  uniform float uMaxBlockSize;      // Peak mosaic block size in pixels (e.g. 48.0)
  uniform float uReducedMotion;     // 1.0 if reduced motion requested, 0.0 otherwise
  uniform vec2 uMouse;              // Subtle cursor parallax offset
  uniform float uIsDark;            // 1.0 = Dark Mode, 0.0 = Light Mode
  uniform vec2 uCenterOffset;       // Horizontal/Vertical shift to place image on right side

  varying vec2 vUv;

  // High quality pseudo-random hash
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  // 2D Value Noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  // Coherent vector displacement field along architectural contours
  vec2 getDisplacement(vec2 uv, float t) {
    float n1 = noise(uv * 3.8 + vec2(t * 0.4, 0.0));
    float n2 = noise(uv * 3.8 + vec2(0.0, t * 0.4) + 31.41);
    vec2 dir = vec2(sin(n1 * 6.28318), cos(n2 * 6.28318));
    dir += vec2(0.28, -0.36);
    return normalize(dir);
  }

  // Background generator: adapts seamlessly between Dark and Light mode
  vec3 getBgColor(vec2 uv) {
    if (uIsDark > 0.5) {
      // Dark mode: deep dark vignette with subtle emerald undertone tracking subject position
      float d = length(uv - vec2(0.5 + uCenterOffset.x * 0.5, 0.5 + uCenterOffset.y * 0.5));
      return mix(vec3(0.015, 0.022, 0.018), vec3(0.003, 0.005, 0.004), smoothstep(0.2, 0.8, d));
    } else {
      // Light mode: pristine architectural studio background with soft natural vignette
      float d = length(uv - vec2(0.5 + uCenterOffset.x * 0.5, 0.46 + uCenterOffset.y * 0.5));
      return mix(vec3(0.975, 0.985, 0.98), vec3(0.92, 0.94, 0.93), smoothstep(0.15, 0.9, d));
    }
  }

  void main() {
    // 1. Right-Side & Responsive Placement with Aspect Ratio Fit
    vec2 screenRes = uResolution;
    vec2 imgRes = uImageResolution;
    float screenAspect = screenRes.x / screenRes.y;
    float imgAspect = imgRes.x / imgRes.y;

    // Apply target center offset and subtle mouse parallax
    vec2 targetCenter = vec2(0.5 + uCenterOffset.x, 0.5 + uCenterOffset.y);
    vec2 uvCentered = (vUv - targetCenter) - uMouse * 0.016;

    // Responsive architectural fit factor adaptively tuned for screen geometry:
    // Mobile portrait: scale comfortably so it sits cleanly in the top 45%
    // Tablet / Desktop: grand architectural presence
    float isPortrait = step(screenRes.x, screenRes.y);
    float fitMargin = (isPortrait > 0.5) 
      ? ((screenRes.x < 500.0) ? 1.34 : 1.22) 
      : ((screenRes.x < 1280.0) ? 1.12 : 1.08);

    if (screenAspect > imgAspect) {
      // Screen wider than image
      uvCentered.x *= (screenAspect / imgAspect) * fitMargin;
      uvCentered.y *= fitMargin;
    } else {
      // Screen taller than image
      uvCentered.y *= (imgAspect / screenAspect) * fitMargin;
      uvCentered.x *= fitMargin;
    }

    vec2 imgUv = uvCentered + 0.5;

    // Background calculation
    vec3 background = getBgColor(vUv);

    // If outside image bounds, render background directly
    if (imgUv.x < 0.0 || imgUv.x > 1.0 || imgUv.y < 0.0 || imgUv.y > 1.0) {
      gl_FragColor = vec4(background, 1.0);
      return;
    }

    // Reduced motion fallback: direct cut/swap without distortion
    if (uReducedMotion > 0.5) {
      vec4 c1 = texture2D(uTexture1, imgUv);
      vec4 c2 = texture2D(uTexture2, imgUv);
      vec4 finalColor = mix(c1, c2, step(0.5, uProgress));
      vec3 col = mix(background, finalColor.rgb, finalColor.a);
      gl_FragColor = vec4(col, 1.0);
      return;
    }

    // 2. Wave staggering across regions
    // Diagonal wave sweeping across the architecture from top-left to bottom-right
    float wavePhase = (imgUv.x * 0.52 + (1.0 - imgUv.y) * 0.48);
    float spatialNoise = noise(imgUv * 5.0) * 0.06;
    wavePhase = clamp(wavePhase + spatialNoise, 0.0, 1.0);

    float staggerWindow = 0.28;
    float localProgress = clamp((uProgress - wavePhase * staggerWindow) / (1.0 - staggerWindow), 0.0, 1.0);

    // 3. Pixelation Block Size Curve
    // Exactly 1px at localProgress = 0.0 (source sharp)
    // Expands to uMaxBlockSize at localProgress = 0.5 (mosaic flow)
    // Shrinks back down to 1px at localProgress = 1.0 (destination sharp)
    float bell = sin(localProgress * 3.14159265);
    float blockStrength = pow(bell, 1.35);
    float targetBlockSize = 1.0 + (uMaxBlockSize - 1.0) * blockStrength;

    // 4. Quantize to mosaic blocks
    vec2 gridCells = imgRes / targetBlockSize;
    vec2 blockUv = (floor(imgUv * gridCells) + 0.5) / gridCells;

    // Smoothly transition from continuous UVs to quantized blocks
    float quantizeMix = smoothstep(0.01, 0.07, blockStrength);
    vec2 sampledUv = mix(imgUv, blockUv, quantizeMix);

    // 5. Coherent Flowing Displacement with 3D Depth Parallax
    vec2 flowDir = getDisplacement(blockUv, localProgress);
    float dispAmount = 0.052 * blockStrength;

    // Quick initial sample to estimate architectural luminance depth
    vec4 testC1 = texture2D(uTexture1, blockUv);
    vec4 testC2 = texture2D(uTexture2, blockUv);
    float rawDepth = mix(
      dot(testC1.rgb, vec3(0.299, 0.587, 0.114)),
      dot(testC2.rgb, vec3(0.299, 0.587, 0.114)),
      localProgress
    );

    // 3D Parallax offset: higher structural elements float outward slightly
    vec2 depthParallax = (blockUv - 0.5) * (rawDepth - 0.3) * 0.045 * blockStrength;

    vec2 uv1 = sampledUv + flowDir * (localProgress * dispAmount) + depthParallax;
    vec2 uv2 = sampledUv - flowDir * ((1.0 - localProgress) * dispAmount) - depthParallax;

    uv1 = clamp(uv1, 0.001, 0.999);
    uv2 = clamp(uv2, 0.001, 0.999);

    // 6. Sample source and target textures
    vec4 color1 = texture2D(uTexture1, uv1);
    vec4 color2 = texture2D(uTexture2, uv2);

    // 7. Progressive Cell Color Transition
    // Individual blocks switch color cascaded by their spatial cell hash
    float cellHash = hash(floor(imgUv * gridCells));
    float cellProgress = clamp((localProgress - (cellHash - 0.5) * 0.26) / (1.0 - 0.26), 0.0, 1.0);
    float colorMix = smoothstep(0.22, 0.78, cellProgress);

    vec4 finalColor = mix(color1, color2, colorMix);

    // 8. 3D Voxel Extrusion & Realistic Prism Shading ("thathuruvama 3D mathri")
    // Transforms pixel blocks into tangible illuminated 3D architectural voxel prisms
    if (quantizeMix > 0.04 && targetBlockSize > 5.5) {
      vec2 cellFract = fract(imgUv * gridCells); // 0.0 to 1.0
      vec2 cellCentered = cellFract - 0.5;       // -0.5 to 0.5
      
      // Calculate true architectural depth from sampled colors
      float depth1 = dot(color1.rgb, vec3(0.299, 0.587, 0.114));
      float depth2 = dot(color2.rgb, vec3(0.299, 0.587, 0.114));
      float blockDepth = mix(depth1, depth2, colorMix);

      // Distance to cell edges
      float edgeX = cellCentered.x;
      float edgeY = cellCentered.y;
      float bevelDist = min(0.5 - abs(edgeX), 0.5 - abs(edgeY));
      float bevelSlope = smoothstep(0.0, 0.14, bevelDist);
      
      // 3D Surface Normal with chamfered edges
      vec3 normal = vec3(
        sign(edgeX) * pow(abs(edgeX * 2.0), 2.2) * (1.0 - bevelSlope),
        -sign(edgeY) * pow(abs(edgeY * 2.0), 2.2) * (1.0 - bevelSlope),
        1.1 + blockDepth * 0.9
      );
      normal = normalize(normal);

      // Directional 3D key light (from top-left architectural sun)
      vec3 lightDir = normalize(vec3(-0.45, 0.65, 0.85));
      vec3 viewDir = vec3(0.0, 0.0, 1.0);
      vec3 halfVec = normalize(lightDir + viewDir);

      // 3D Diffuse & Specular Glint
      float NdotL = max(0.0, dot(normal, lightDir));
      float NdotH = max(0.0, dot(normal, halfVec));
      float spec = pow(NdotH, 18.0) * (0.35 + 0.45 * blockDepth);

      // Crevice ambient occlusion between adjacent blocks
      float creviceShadow = smoothstep(0.0, 0.08, bevelDist) * 0.28 + 0.72;
      
      // Top bevel highlight (simulate cut glass / polished stone voxel)
      float topHighlight = smoothstep(0.38, 0.48, 0.5 - edgeY) * (1.0 - bevelSlope) * 0.26;

      // Apply 3D voxel lighting
      float voxelShade = mix(0.82, 1.18, NdotL) * creviceShadow + topHighlight;
      finalColor.rgb *= mix(1.0, voxelShade, quantizeMix * 0.88);
      
      // Add specular glint to illuminated blocks during morph
      finalColor.rgb += vec3(spec * 0.5) * quantizeMix * blockStrength;

      // Subtle emerald & amber dispersion on moving 3D edges
      float dispStrength = (0.010 + 0.008 * blockDepth) * blockStrength;
      if (dispStrength > 0.0015) {
        float rShift = texture2D(uTexture1, clamp(uv1 + vec2(dispStrength, 0.0), 0.001, 0.999)).r;
        float bShift = texture2D(uTexture2, clamp(uv2 - vec2(dispStrength, 0.0), 0.001, 0.999)).b;
        finalColor.r = mix(finalColor.r, mix(rShift, color2.r, colorMix), blockStrength * 0.35);
        finalColor.b = mix(finalColor.b, mix(color1.b, bShift, colorMix), blockStrength * 0.35);
      }
    }

    // Outer border soft edge blend
    float borderDist = min(min(imgUv.x, 1.0 - imgUv.x), min(imgUv.y, 1.0 - imgUv.y));
    float borderFade = smoothstep(0.0, 0.015, borderDist);
    finalColor.a *= borderFade;

    // Contact drop-shadow in Light mode under the floating island base (follows the shifted position)
    if (uIsDark < 0.5) {
      float shadowD = length((imgUv - vec2(0.5, 0.86)) * vec2(1.0, 3.2));
      float shadow = (1.0 - smoothstep(0.0, 0.44, shadowD)) * 0.18;
      background *= (1.0 - shadow);
    }

    // Final composite: architecture seamlessly over dynamic background
    vec3 composite = mix(background, finalColor.rgb, finalColor.a);
    gl_FragColor = vec4(composite, 1.0);
  }
`;

export function PixelMorphExperience({
  scrollProgress,
  isDark = true,
  onStageChange,
  className = "",
}: PixelMorphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const texturesRef = useRef<THREE.Texture[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Mouse tilt tracking
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const targetMouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));

  // Current active stage state
  const currentStageRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);

  // Helper to determine horizontal and vertical center offset across all device sizes:
  // - Large Desktop (>= 1280px): shift right (+0.18) for side-by-side
  // - Laptop (1024px - 1279px): shift right (+0.16) for side-by-side
  // - Tablet Landscape (w >= 768 && w > h): shift right (+0.14)
  // - Tablet Portrait (w >= 768 && w <= h): shift UP (+0.15) for stacked
  // - Mobile Landscape (w < 768 && w > h): shift right (+0.18)
  // - Mobile Portrait (w < 768 && w <= h): shift UP (+0.18) for top-half placement
  const getCenterOffset = useCallback((w: number, h: number) => {
    const isLandscape = w > h;
    if (w >= 1280) {
      return new THREE.Vector2(0.18, -0.02);
    } else if (w >= 1024) {
      return new THREE.Vector2(0.16, -0.02);
    } else if (w >= 768) {
      if (isLandscape) {
        return new THREE.Vector2(0.14, 0.01);
      } else {
        return new THREE.Vector2(0.0, 0.15);
      }
    } else {
      // Mobile (< 768px)
      if (isLandscape) {
        return new THREE.Vector2(0.18, 0.0);
      } else {
        // Mobile portrait: shift UP to top half
        return new THREE.Vector2(0.0, 0.18);
      }
    }
  }, []);


  // Preload all 4 textures
  useEffect(() => {
    let isMounted = true;
    const loader = new THREE.TextureLoader();

    const loadPromises = STAGE_IMAGES.map(
      (src) =>
        new Promise<THREE.Texture>((resolve, reject) => {
          loader.load(
            src,
            (tex) => {
              tex.minFilter = THREE.LinearFilter;
              tex.magFilter = THREE.LinearFilter;
              tex.wrapS = THREE.ClampToEdgeWrapping;
              tex.wrapT = THREE.ClampToEdgeWrapping;
              tex.generateMipmaps = false;
              resolve(tex);
            },
            undefined,
            (err) => reject(new Error(`Failed to load ${src}: ${err}`))
          );
        })
    );

    Promise.all(loadPromises)
      .then((loadedTextures) => {
        if (!isMounted) {
          loadedTextures.forEach((t) => t.dispose());
          return;
        }
        texturesRef.current = loadedTextures;
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error("Texture preloading error:", err);
        if (isMounted) setLoadError(err.message);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Update clear color and uIsDark uniform on theme change
  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setClearColor(isDark ? 0x020303 : 0xf8faf9, 1.0);
    }
    if (materialRef.current) {
      materialRef.current.uniforms.uIsDark.value = isDark ? 1.0 : 0.0;
    }
  }, [isDark]);

  // Set up Three.js WebGL Scene
  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      powerPreference: "high-performance",
      antialias: false,
      alpha: true,
      stencil: false,
      depth: false,
    });

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);
    renderer.setClearColor(isDark ? 0x020303 : 0xf8faf9, 1.0);

    // Clean container before appending
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Detect reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reducedMotion = mediaQuery.matches ? 1.0 : 0.0;

    const maxBlockSize = Math.max(32.0, Math.min(56.0, (width / 1920) * 48.0));
    const initialOffset = getCenterOffset(width, height);

    const uniforms = {
      uTexture1: { value: texturesRef.current[0] },
      uTexture2: { value: texturesRef.current[1] },
      uProgress: { value: 0.0 },
      uResolution: { value: new THREE.Vector2(width * dpr, height * dpr) },
      uImageResolution: { value: new THREE.Vector2(1024.0, 1024.0) },
      uTime: { value: 0.0 },
      uMaxBlockSize: { value: maxBlockSize },
      uReducedMotion: { value: reducedMotion },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uIsDark: { value: isDark ? 1.0 : 0.0 },
      uCenterOffset: { value: initialOffset },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      depthTest: false,
      depthWrite: false,
    });
    materialRef.current = material;

    // Fullscreen quad
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse listener for restrained parallax
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      targetMouseRef.current.set(nx, ny);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Resize listener
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !materialRef.current) return;
      const newW = containerRef.current.clientWidth || window.innerWidth;
      const newH = containerRef.current.clientHeight || window.innerHeight;
      rendererRef.current.setSize(newW, newH);
      const curDpr = Math.min(window.devicePixelRatio || 1, 2);
      rendererRef.current.setPixelRatio(curDpr);
      materialRef.current.uniforms.uResolution.value.set(newW * curDpr, newH * curDpr);
      materialRef.current.uniforms.uMaxBlockSize.value = Math.max(
        32.0,
        Math.min(56.0, (newW / 1920) * 48.0)
      );
      materialRef.current.uniforms.uCenterOffset.value.copy(getCenterOffset(newW, newH));
    };

    window.addEventListener("resize", handleResize);

    // Animation frame render loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Lerp mouse
      mouseRef.current.lerp(targetMouseRef.current, 0.05);

      if (materialRef.current) {
        materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
        materialRef.current.uniforms.uMouse.value.copy(mouseRef.current);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isLoaded, isDark, getCenterOffset]);

  // Robust 4-Stage Partitioning with Generous Dwell Zones
  const updateTransition = useCallback(
    (totalProgress: number) => {
      if (!materialRef.current || texturesRef.current.length < 4) return;

      const S = Math.max(0.0, Math.min(1.0, totalProgress));

      let activeStageIdx = 0;
      let t1Idx = 0;
      let t2Idx = 1;
      let morphP = 0.0;
      let morphing = false;

      // Stage 1 Dwell: 0.00 to 0.16 (Image 1 completely sharp)
      if (S < 0.16) {
        activeStageIdx = 0;
        t1Idx = 0;
        t2Idx = 1;
        morphP = 0.0;
        morphing = false;
      }
      // Transition 1 -> 2: 0.16 to 0.34
      else if (S < 0.34) {
        activeStageIdx = S < 0.25 ? 0 : 1;
        t1Idx = 0;
        t2Idx = 1;
        morphP = (S - 0.16) / (0.34 - 0.16);
        morphing = true;
      }
      // Stage 2 Dwell: 0.34 to 0.50 (Image 2 completely sharp)
      else if (S < 0.50) {
        activeStageIdx = 1;
        t1Idx = 1;
        t2Idx = 2;
        morphP = 0.0;
        morphing = false;
      }
      // Transition 2 -> 3: 0.50 to 0.68
      else if (S < 0.68) {
        activeStageIdx = S < 0.59 ? 1 : 2;
        t1Idx = 1;
        t2Idx = 2;
        morphP = (S - 0.50) / (0.68 - 0.50);
        morphing = true;
      }
      // Stage 3 Dwell: 0.68 to 0.84 (Image 3 completely sharp; Image 4 strictly invisible!)
      else if (S < 0.84) {
        activeStageIdx = 2;
        t1Idx = 2;
        t2Idx = 3;
        morphP = 0.0;
        morphing = false;
      }
      // Transition 3 -> 4: 0.84 to 0.98
      else if (S < 0.98) {
        activeStageIdx = S < 0.91 ? 2 : 3;
        t1Idx = 2;
        t2Idx = 3;
        morphP = (S - 0.84) / (0.98 - 0.84);
        morphing = true;
      }
      // Stage 4 Dwell: 0.98 to 1.00 (Image 4 completely sharp)
      else {
        activeStageIdx = 3;
        t1Idx = 2;
        t2Idx = 3;
        morphP = 1.0;
        morphing = false;
      }

      morphP = Math.max(0.0, Math.min(1.0, morphP));

      const srcTexture = texturesRef.current[t1Idx];
      const dstTexture = texturesRef.current[t2Idx];

      const uniforms = materialRef.current.uniforms;
      if (uniforms.uTexture1.value !== srcTexture) {
        uniforms.uTexture1.value = srcTexture;
      }
      if (uniforms.uTexture2.value !== dstTexture) {
        uniforms.uTexture2.value = dstTexture;
      }
      uniforms.uProgress.value = morphP;

      // Apply dynamic stage offset for the 4th image
      if (containerRef.current) {
        const w = containerRef.current.clientWidth || window.innerWidth;
        const h = containerRef.current.clientHeight || window.innerHeight;
        const baseOffset = getCenterOffset(w, h);
        
        // Move 2nd image (index 1) UP by 0.10, and 4th image (index 3) UP by 0.12 units
        const stageOffsets = [0.0, 0.10, 0.0, 0.12]; 
        const currentY = stageOffsets[t1Idx];
        const nextY = stageOffsets[t2Idx];
        const extraY = currentY + (nextY - currentY) * morphP;
        
        uniforms.uCenterOffset.value.set(baseOffset.x, baseOffset.y + extraY);
      }

      currentStageRef.current = activeStageIdx;
      currentProgressRef.current = morphP;

      if (onStageChange) {
        onStageChange(activeStageIdx, morphP, morphing);
      }
    },
    [onStageChange]
  );

  useEffect(() => {
    updateTransition(scrollProgress);
  }, [scrollProgress, updateTransition]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden transition-colors duration-500 select-none ${isDark ? "bg-[#020303]" : "bg-[#f8faf9]"
        } ${className}`}
      style={{ touchAction: "pan-y" }}
    >
      {!isLoaded && !loadError && (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center z-20 ${isDark ? "bg-[#020303]" : "bg-[#f8faf9]"
            }`}
        >
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border border-emerald-500/20" />
            <div className="absolute inset-0 rounded-full border-t-2 border-emerald-500 animate-spin" />
          </div>
          <span className="mt-4 text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Initializing 3D Voxel Morph Shader...
          </span>
        </div>
      )}

      {loadError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-red-400 text-sm p-6 text-center z-20">
          Failed to initialize WebGL morph assets: {loadError}
        </div>
      )}
    </div>
  );
}
