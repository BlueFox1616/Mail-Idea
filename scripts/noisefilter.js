window.onload = function () {
  console.log("✅ Script loaded!");

  const svgElement = document.getElementById("hiddenSvg");

  if (svgElement) {
    // Temporarily show the SVG for extraction
    svgElement.style.display = "block";

    // Store the SVG markup in localStorage
    const svgMarkup = svgElement.outerHTML;
    localStorage.setItem("noiseFilter", svgMarkup);
    console.log("✅ SVG stored successfully!");

    // Create the URL for the stored SVG (Base64 encoding)
    const svgUrl = `data:image/svg+xml;base64,${btoa(svgMarkup)}`;

    // Create a new overlay div
    const overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = `url('${svgUrl}')`;
    overlay.style.opacity = "0.1"; // Apply opacity to the overlay
    overlay.style.pointerEvents = "none"; // Ensure it doesn't block interactions
    overlay.style.zIndex = "-1";

    // Append the overlay to the body
    document.body.appendChild(overlay);

    // Hide the SVG again after extraction
    svgElement.style.display = "none";
  }
};
