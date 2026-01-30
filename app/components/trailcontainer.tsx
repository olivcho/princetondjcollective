"use client";

import { useEffect, useRef } from "react";

interface TrailImage {
    element: HTMLDivElement;
    removeTime: number;
}

export default function TrailContainer() {
    const trailContainerRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number | null>(null);
    const trailRef = useRef<TrailImage[]>([]);
    const currentImageIndexRef = useRef(0);
    const mousePosRef = useRef({ x: 0, y: 0 });
    const lastMousePosRef = useRef({ x: 0, y: 0 });
    const interpolatedMousePosRef = useRef({ x: 0, y: 0 });
    const isActiveRef = useRef(false);

    useEffect(() => {
        const config = {
            imageLifespan: 2000,
            mouseThreshold: 300,
            inDuration: 800,
            outDuration: 600,
            imageSize: 175,
            lerpFactor: 0.15,
            slideeasing: "ease",
            easing: "ease",
            maxImages: 3
        };

        const trailImageCount = 11;
        const images = Array.from(
            { length: trailImageCount },
            (_, index) => `/images/${index + 1}.jpeg`
        );

        const trailContainer = trailContainerRef.current;
        if (!trailContainer) return;

        const MathUtils = {
            lerp: (a: number, b: number, n: number) => (1 - n) * a + n * b,
            distance: (x1: number, y1: number, x2: number, y2: number) =>
                Math.hypot(x2 - x1, y2 - y1),
        };

        const fadeOutImage = (trailImage: TrailImage) => {
            trailImage.element.style.transition = `opacity ${config.outDuration}ms ${config.easing}, transform ${config.outDuration}ms ${config.easing}`;
            trailImage.element.style.opacity = "0";
            trailImage.element.style.transform = "scale(0.8)";
            setTimeout(() => {
                trailImage.element.remove();
            }, config.outDuration);
        };

        const createTrailImage = () => {
            // Remove oldest image if at max capacity
            while (trailRef.current.length >= config.maxImages) {
                const imgToRemove = trailRef.current.shift();
                if (imgToRemove) {
                    fadeOutImage(imgToRemove);
                }
            }

            const imgContainer = document.createElement("div");
            imgContainer.className = "trail-img";
            
            // Apply styles directly to ensure they work
            imgContainer.style.position = "absolute";
            imgContainer.style.opacity = "0";
            imgContainer.style.transform = "scale(0.5)";
            imgContainer.style.pointerEvents = "none";
            imgContainer.style.willChange = "transform, opacity, left, top";

            const img = document.createElement("img");
            const imgSrc = images[currentImageIndexRef.current];
            currentImageIndexRef.current =
                (currentImageIndexRef.current + 1) % images.length;

            img.src = imgSrc;
            img.alt = "Trail image";
            img.draggable = false;
            img.style.width = "80%";
            img.style.height = "80%";
            img.style.objectFit = "cover";
            img.style.borderRadius = "0px";
            img.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.15)";
            img.style.userSelect = "none";

            const halfSize = config.imageSize / 2;
            const startX = interpolatedMousePosRef.current.x - halfSize;
            const startY = interpolatedMousePosRef.current.y - halfSize;
            const targetX = mousePosRef.current.x - halfSize;
            const targetY = mousePosRef.current.y - halfSize;

            // Set initial position
            imgContainer.style.left = `${startX}px`;
            imgContainer.style.top = `${startY}px`;
            imgContainer.style.width = `${config.imageSize}px`;
            imgContainer.style.height = `${config.imageSize}px`;

            imgContainer.appendChild(img);
            trailContainer.appendChild(imgContainer);

            // Track in trail array
            const trailImage: TrailImage = {
                element: imgContainer,
                removeTime: Date.now() + config.imageLifespan,
            };
            trailRef.current.push(trailImage);

            // Trigger entrance animation
            requestAnimationFrame(() => {
                imgContainer.style.transition = `
                    left ${config.inDuration}ms ${config.slideeasing},
                    top ${config.inDuration}ms ${config.slideeasing},
                    opacity ${config.inDuration}ms ${config.easing},
                    transform ${config.inDuration}ms ${config.easing}
                `;
                imgContainer.style.left = `${targetX}px`;
                imgContainer.style.top = `${targetY}px`;
                imgContainer.style.opacity = "1";
                imgContainer.style.transform = "scale(1)";
            });

            // Update last spawned position
            lastMousePosRef.current = { ...mousePosRef.current };
        };

        const removeOldImages = () => {
            const now = Date.now();
            while (trailRef.current.length > 0) {
                const oldestImage = trailRef.current[0];
                if (now > oldestImage.removeTime) {
                    const imgToRemove = trailRef.current.shift();
                    if (imgToRemove) {
                        fadeOutImage(imgToRemove);
                    }
                } else {
                    break;
                }
            }
        };

        const animate = () => {
            // Smoothly interpolate mouse position
            interpolatedMousePosRef.current.x = MathUtils.lerp(
                interpolatedMousePosRef.current.x,
                mousePosRef.current.x,
                config.lerpFactor
            );
            interpolatedMousePosRef.current.y = MathUtils.lerp(
                interpolatedMousePosRef.current.y,
                mousePosRef.current.y,
                config.lerpFactor
            );

            // Check distance to spawn new image
            const distance = MathUtils.distance(
                mousePosRef.current.x,
                mousePosRef.current.y,
                lastMousePosRef.current.x,
                lastMousePosRef.current.y
            );

            if (distance > config.mouseThreshold && isActiveRef.current) {
                createTrailImage();
            }

            // Remove old images
            removeOldImages();

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mousePosRef.current = { x: e.clientX, y: e.clientY };

            // Activate on first mouse move
            if (!isActiveRef.current) {
                isActiveRef.current = true;
                interpolatedMousePosRef.current = { x: e.clientX, y: e.clientY };
                lastMousePosRef.current = { x: e.clientX, y: e.clientY };
            }
        };

        // Start animation loop
        animationFrameRef.current = requestAnimationFrame(animate);

        // Add event listeners
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            window.removeEventListener("mousemove", handleMouseMove);

            // Clean up remaining trail images
            trailRef.current.forEach((item) => item.element.remove());
            trailRef.current = [];
        };
    }, []);

    return (
        <div
            ref={trailContainerRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                pointerEvents: "none",
                overflow: "hidden",
                zIndex: 50,
            }}
        />
    );
}