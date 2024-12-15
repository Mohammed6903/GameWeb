import { JSDOM } from "jsdom";

/**
 * Parse a DOM element as text and get all its attributes in JSON format (Node.js/Server-side).
 * @param {string} elementText - The serialized HTML string of the element.
 * @returns {Object} - A JSON object containing all attributes of the element.
 */
function parseElementAttributesFromText(elementText) {
    if (typeof elementText !== "string" || !elementText.trim()) {
        throw new Error("Invalid element text provided. Must be a non-empty string.");
    }

    // Use JSDOM to parse the HTML string
    const dom = new JSDOM(elementText.trim());
    const element = dom.window.document.body.firstElementChild;

    if (!element) {
        throw new Error("Invalid HTML structure. Could not parse element.");
    }

    // Extract attributes
    const attributes = {};
    for (const attr of element.attributes) {
        attributes[attr.name] = attr.value;
    }

    return attributes;
}

// Usage example in server-side context
const serializedElement = '<div id="hey" class="class1 class2" style="color: red; background-color: blue;" data-role="button" aria-label="Submit"></div>';

try {
    const attributes = parseElementAttributesFromText(serializedElement);
    console.log("Attributes as JSON:", attributes);
} catch (error) {
    console.error(error.message);
}