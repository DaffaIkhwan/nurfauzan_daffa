"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "@studio-freight/lenis";
import styled from "@emotion/styled";
import { Canvas, extend } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  Environment,
  Lightformer,
} from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import Band from "@/components/band";
import Image from "next/image";
import { bebas_neue } from "@/utils/fonts";

// Extend Three.js with custom materials
extend({ MeshLineGeometry, MeshLineMaterial });

// Preload 3D assets
useGLTF.preload("/assets/3d/card.glb");
useTexture.preload("/assets/images/tag_texture.png");

// Define a single consistent background color
const backgroundColor = "#000000";

// Global styles applied to the entire document
const GlobalStyles = () => {
  useEffect(() => {
    // Apply styles to html and body elements
    document.documentElement.style.backgroundColor = backgroundColor;
    document.documentElement.style.height = "100%";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    
    document.body.style.backgroundColor = backgroundColor;
    document.body.style.height = "100%";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "auto";
    
    // Create a style element to handle any potential gaps
    const style = document.createElement('style');
    style.textContent = `
      * {
        box-sizing: border-box;
      }
      html, body, #__next, main {
        background-color: ${backgroundColor};
      }
      /* Ensure no white spaces between sections */
      section {
        margin: 0;
        padding: 0;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return null;
};

// Styled components
const MainContainer = styled.main`
  width: 100%;
  height: 700vh;
  background-color: ${backgroundColor};
  margin: 0;
  padding: 0;
  overflow-x: hidden;
`;

const Section = styled.section`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: ${backgroundColor};
  margin: 0;
  padding: 0;
`;

const FooterSection = styled(Section)`
  position: relative;
  height: 100vh;
  margin-top: 0;
  z-index: 1;
`;

const StyledH1 = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  text-align: center;
  font-size: 5vw;
  font-weight: lighter;
  line-height: 100%;
  font-family: "Helvetica Neue";
`;

const Card = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 450px;
  perspective: 1000px;
`;

const CardWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  animation: floating 3s infinite ease-in-out;

  @keyframes floating {
    0% {
      transform: translate(-50%, -50%);
    }
    50% {
      transform: translate(-50%, -60%);
    }
    100% {
      transform: translate(-50%, -50%);
    }
  }
`;

const FlipCardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
`;

const FlipCardSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 0.8em;
  overflow: hidden;
`;

const FlipCardBack = styled(FlipCardSide)`
  padding: 1em;
  background-color: #fff;
  transform: rotateY(180deg);
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  mix-blend-mode: difference;
`;

const CardLogo = styled(Image)`
  &:hover {
    filter: invert();
  }
`;

const Badge3DContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  background-color: ${backgroundColor};
  margin: 0;
  padding: 0;
`;

const CanvasContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: ${backgroundColor};
  margin: 0;
  padding: 0;
`;

// About component
const About = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  const firstRow = [
    { label: "I", id: "I" },
    { label: "Expertly", id: "Expertly" },
    { label: "Blend", id: "Blend" },
  ];

  const secondRow = [
    { label: "My", id: "My" },
    { label: "Design", id: "Design" },
    { label: "Background", id: "Background" },
    { label: "With", id: "With" },
  ];

  const thirdRow = [
    { label: "My", id: "My-2" },
    { label: "Development", id: "Development" },
    { label: "Skills.", id: "Skills" },
  ];

  gsap.registerPlugin(useGSAP);

  useGSAP(
    (): void => {
      const secondTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top bottom",
          end: "3500px",
          scrub: true,
        },
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2500px",
          scrub: true,
          pin: true,
        },
      });

      secondTimeline.fromTo(
        dotRef.current,
        {
          scale: 0,
          translateY: -30,
        },
        {
          scale: 350,
          duration: 1,
          translateY: 800,
        },
      );

      const elementIDs = [
        "#I",
        "#Expertly",
        "#Blend",
        "#My",
        "#Design",
        "#Background",
        "#With",
        "#My-2",
        "#Development",
        "#Skills",
      ];

      elementIDs.forEach((id): void => {
        timeline.to(id, {
          display: "block",
          opacity: 1,
          filter: "blur(0px)",
          color: "#FFFFFF",
        });
      });

      timeline.to(["#Development", "#Skills"], {
        color: "#FF4D4D",
        textShadow: "0px 0px 10px #FF4D4D",
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      data-testid="homeAboutSection"
      className="overflow-hidden pt-section"
      ref={containerRef}
    >
      <div ref={triggerRef} className="relative grid h-screen w-full">
        <div
          ref={dotRef}
          className="absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-dark dark:bg-light"
        ></div>
        <div className="col-start-1 col-end-7 flex flex-col items-center justify-center gap-x-small gap-y-0 md:col-start-2 md:col-end-12">
          <div className="flex flex-wrap items-center justify-center gap-x-large">
            {firstRow.map(({ label, id }, index) => (
              <span
                key={index}
                id={id}
                className={`${bebas_neue.className} hidden text-7xl text-light opacity-0 blur-2xl dark:text-dark md:text-8xl lg:text-[9rem]`}
              >
                {label}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-large">
            {secondRow.map(({ label, id }, index) => (
              <span
                key={index}
                id={id}
                className={`${bebas_neue.className} hidden text-7xl text-light opacity-0 blur-2xl dark:text-dark md:text-8xl lg:text-[9rem]`}
              >
                {label}
              </span>
            ))}
          </div>  
          <div className="flex flex-wrap items-center justify-center gap-x-large">
            {thirdRow.map(({ label, id }, index) => (
              <span
                key={index}
                id={id}
                className={`${bebas_neue.className} hidden text-7xl text-light opacity-0 blur-2xl dark:text-dark md:text-8xl lg:text-[9rem]`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Badge3D = () => {
  return (
    <Badge3DContainer>
      <CanvasContainer>
        <Canvas
          camera={{ position: [0, 0, 13], fov: 25 }}
          style={{ 
            backgroundColor: backgroundColor,
            margin: 0, 
            padding: 0,
            display: 'block',
            width: '100%',
            height: '100%'
          }}
        >
          <color attach="background" args={[backgroundColor]} />
          <ambientLight intensity={Math.PI} />
          <Physics
            debug={false}
            interpolate
            gravity={[0, -40, 0]}
            timeStep={1 / 60}
          >
            <Band />
          </Physics>
          <Environment background blur={0.75}>
            <Lightformer
              intensity={2}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={10}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Canvas>
      </CanvasContainer>
    </Badge3DContainer>
  );
};

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const cards = gsap.utils.toArray<HTMLElement>(".card");
    const totalScrollHeight = window.innerHeight * 3;
    const positions = [14, 38, 62, 86];
    const rotations = [-15, -7.5, 7.5, 15];

    // Pin the cards section
    ScrollTrigger.create({
      trigger: ".cards",
      start: "top top",
      end: () => `+=${totalScrollHeight}`,
      pin: true,
      pinSpacing: true,
    });

    // Spread cards
    cards.forEach((card, index) => {
      gsap.to(card, {
        left: `${positions[index]}%`,
        rotation: `${rotations[index]}`,
        ease: "none",
        scrollTrigger: {
          trigger: ".cards",
          start: "top top",
          end: () => `+=${window.innerHeight}`,
          scrub: 0.5,
          id: `spread-${index}`,
        },
      });
    });

    // Rotate and flip cards with staggered effect
    cards.forEach((card, index) => {
      const frontEl = card.querySelector<HTMLElement>(".flip-card-front");
      const backEl = card.querySelector<HTMLElement>(".flip-card-back");

      if (!frontEl || !backEl) return;

      const staggerOffset = index * 0.05;
      const startOffset = 1 / 3 + staggerOffset;
      const endOffset = 2 / 3 + staggerOffset;

      ScrollTrigger.create({
        trigger: ".cards",
        start: "top top",
        end: () => `+=${totalScrollHeight}`,
        scrub: 1,
        id: `rotate-flip-${index}`,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress >= startOffset && progress <= endOffset) {
            const animationProgress = (progress - startOffset) / (1 / 3);
            const frontRotation = -180 * animationProgress;
            const backRotation = 180 - 180 * animationProgress;
            const cardRotation = rotations[index] * (1 - animationProgress);

            frontEl.style.transform = `rotateY(${frontRotation}deg)`;
            backEl.style.transform = `rotateY(${backRotation}deg)`;
            card.style.transform = `translate(-50%, -50%) rotate(${cardRotation}deg)`;
          }
        },
      });
    });

    // Set up ScrollTrigger for About section to start after cards section
    ScrollTrigger.create({
      trigger: ".about-section",
      start: "top top",
      end: () => `+=${window.innerHeight * 2}`, // Reduced from 3 to 2
      pin: true,
      pinSpacing: true,
      id: "about-section-pin"
    });

    // Add a ScrollTrigger for the footer
    ScrollTrigger.create({
      trigger: ".footer",
      start: "top bottom",
      end: "bottom bottom",
      id: "footer-trigger"
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <GlobalStyles />
      <MainContainer>
        {/* 3D Badge Section */}
        <Badge3D />
        
        {/* Cards Section */}
        <Section className="cards">
          {[1, 2, 3, 4].map((num) => (
            <Card key={num} className="card" id={`card-${num}`}>
              <CardWrapper style={{ animationDelay: `${(num - 1) * 0.2}s` }}>
                <FlipCardInner>
                  <FlipCardSide className="flip-card-front">
                    <ImageWrapper>
                      <StyledImage
                        src={num % 2 === 0 ? "/assets/images/front.jpg" : "/assets/images/back.jpg"}
                        alt="Card"
                        fill
                        priority
                      />
                    </ImageWrapper>
                  </FlipCardSide>
                  <FlipCardBack className="flip-card-back" style={{ position: 'relative' }}>
                    <ImageWrapper>
                      <StyledImage
                        src={num % 2 === 0 ? "/assets/images/front.jpg" : "/assets/images/back.jpg"}
                        alt="gif"
                        fill
                        priority
                        style={{ zIndex: 0 }}
                      />
                    </ImageWrapper>

                    {/* Content Layer (Ensures icons are clickable) */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '0.8em',
                        zIndex: 1, // Ensures content is on top
                        pointerEvents: 'auto', // Allows interaction with child elements
                      }}
                    >
                      {num === 1 ? (
                        <>
                          <a href="https://www.linkedin.com/in/daffanurfauzan/" target="_blank" rel="noopener noreferrer">
                            <ImageWrapper style={{ width: '200px', height: '200px', margin: '0 auto' }}>
                              <CardLogo
                                src="/assets/images/linkedin.png"
                                alt="LinkedIn Logo"
                                width={200}
                                height={200}
                                style={{ cursor: 'pointer' }} // Ensures hover effect works
                              />
                            </ImageWrapper>
                          </a>
                          <p style={{ textAlign: 'center', fontSize: '1.5rem', marginTop: '1rem', color: '#000', fontWeight: 'bold' }}>LinkedIn</p>
                        </>
                       ) : num === 2 ? (
                        <>
                          <a href="https://github.com/DaffaIkhwan" target="_blank" rel="noopener noreferrer">
                            <ImageWrapper style={{ width: '200px', height: '200px', margin: '0 auto' }}>
                              <CardLogo
                                src="/assets/images/github.png"
                                alt="GitHub Logo"
                                width={240}
                                height={240}
                                style={{ cursor: 'pointer' }} // Ensures hover effect works
                              />
                            </ImageWrapper>
                          </a>
                          <p style={{ textAlign: 'center', fontSize: '1.5rem', marginTop: '1rem', color: '#000', fontWeight: 'bold' }}>GitHub</p>
                        </>
                    ) : num === 3 ? (
                      <>
                        <a href="https://www.instagram.com/nurfauuzan" target="_blank" rel="noopener noreferrer">
                          <ImageWrapper style={{ width: '200px', height: '200px', margin: '0 auto' }}>
                            <CardLogo
                              src="/assets/images/instagram.png"
                              alt="GitHub Logo"
                              width={240}
                              height={240}
                              style={{ cursor: 'pointer' }} // Ensures hover effect works
                            />
                          </ImageWrapper>
                        </a>
                        <p style={{ textAlign: 'center', fontSize: '1.5rem', marginTop: '1rem', color: '#000', fontWeight: 'bold' }}>Instagram</p>
                      </>
                      ) : num === 4 ? (
                        <>
                          <a href="https://www.facebook.com/daffa.ikhwan.9/" target="_blank" rel="noopener noreferrer">
                            <ImageWrapper style={{ width: '200px', height: '200px', margin: '0 auto' }}>
                              <CardLogo
                                src="/assets/images/facebook.png"
                                alt="GitHub Logo"
                                width={240}
                                height={240}
                                style={{ cursor: 'pointer' }} // Ensures hover effect works
                              />
                            </ImageWrapper>
                          </a>
                          <p style={{ textAlign: 'center', fontSize: '1.5rem', marginTop: '1rem', color: '#000', fontWeight: 'bold' }}>Facebook</p>
                        </>
                      ) : null}
                    </div>
                  </FlipCardBack>
                </FlipCardInner>
              </CardWrapper>
            </Card>
          ))}
        </Section>
        
        {/* About Section - Positioned after cards */}
        <Section className="about-section">
          <About />
        </Section>
        
        {/* Footer Section - With improved visibility */}
        <FooterSection className="footer">
          <StyledH1>&copy; Nurfauzan</StyledH1>
        </FooterSection>
      </MainContainer>
    </>
  );
}