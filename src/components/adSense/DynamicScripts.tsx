"use client";

import { useEffect } from "react";

interface DynamicScriptsProps {
  adsData: {
    parsedElement: {
      type: string;
      attributes: Record<string, string>;
    };
    script: string;
  }[];
}

const DynamicScripts: React.FC<DynamicScriptsProps> = ({ adsData }) => {
  useEffect(() => {
    adsData.forEach((ad) => {
      const { parsedElement, script } = ad;

      // Build selector
      const { type, attributes } = parsedElement;
      const selector = buildSelector(type, attributes);
      const targetElement = document.querySelector(selector);

      if (targetElement) {
        console.log("Target element found:", targetElement);

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = script;

        // Handle <ins> elements
        const insTags = tempDiv.querySelectorAll("ins");
        insTags.forEach((insTag) => {
          // Remove existing <ins> if necessary
          const existingIns = targetElement.querySelector("ins.adsbygoogle");
          if (existingIns) targetElement.removeChild(existingIns);

          // Create and append new <ins>
          const newIns = document.createElement("ins");
          Array.from(insTag.attributes).forEach((attr) => {
            newIns.setAttribute(attr.name, attr.value);
          });
          targetElement.appendChild(newIns);

          // Initialize AdSense
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (e) {
            console.error("AdSense initialization error:", e);
          }
        });

        // Handle <script> elements
        const scriptTags = tempDiv.querySelectorAll("script");
        scriptTags.forEach((scriptTag) => {
          const newScript = document.createElement("script");
          if (scriptTag.src) {
            newScript.src = scriptTag.src;
            newScript.async = true;
          } else {
            newScript.textContent = scriptTag.textContent;
          }
          targetElement.appendChild(newScript);
        });
      } else {
        console.warn("Target element not found for:", parsedElement);
      }
    });
  }, [adsData]);

  return null; // No UI, only script injection
};

// Helper function to build a CSS selector
const buildSelector = (type: string, attributes: Record<string, string>): string => {
  let selector = type;

  for (const [key, value] of Object.entries(attributes)) {
    if (key === "className") {
      selector += `.${value.split(" ").join(".")}`;
    } else if (key === "id") {
      selector += `#${value}`;
    } else {
      selector += `[${key}="${value}"]`;
    }
  }

  return selector;
};

export default DynamicScripts;