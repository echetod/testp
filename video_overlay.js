document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("questionVideo");
    const overlay = document.getElementById("overlay");
    const optionsContainer = document.querySelector(".options-container");
    const options = document.querySelectorAll(".option-image");
    const retryButton = document.getElementById("retryButton");

    // Function to play the appropriate video
    const playVideo = (videoFile) => {
        video.src = videoFile;
        video.load();
        video.play();
        overlay.classList.add("hidden-overlay");
        retryButton.classList.add("hidden-retry");
    };

    // Function to add event listeners to options
    const addEventListenersToOptions = () => {
        options.forEach((option, index) => {
            option.onclick = () => {
                removeEventListenersFromOptions(); // Remove listeners on click

                if (index === 2) { // opt3 is the correct option (0-based index)
                    playVideo("correct.mp4");
                } else {
                    playVideo("incorrect.mp4");
                }
            };
        });
    };

    // Function to remove event listeners from options
    const removeEventListenersFromOptions = () => {
        options.forEach((option) => {
            option.onclick = null;
        });
    };

    // Show overlay only when question.mp4 ends
    video.addEventListener("ended", () => {
        if (video.currentSrc.includes("question.mp4")) {
            overlay.classList.remove("hidden-overlay");
            overlay.classList.add("visible-overlay");
            optionsContainer.style.display = "grid";
            retryButton.classList.add("hidden-retry");
            retryButton.classList.remove("visible-retry");
        } else if (video.currentSrc.includes("incorrect.mp4")) {
            optionsContainer.style.display = "none";
            retryButton.classList.remove("hidden-retry");
            retryButton.classList.add("visible-retry");
        } else if (video.currentSrc.includes("correct.mp4")) {
            optionsContainer.style.display = "none";
        }
    });

    // Retry button functionality
    retryButton.addEventListener("click", () => {
        // Hide overlay and retry button
        overlay.classList.add("hidden-overlay");
        overlay.classList.remove("visible-overlay");
        retryButton.classList.add("hidden-retry");
        retryButton.classList.remove("visible-retry");

        // Display the option images in the hidden overlay
        optionsContainer.style.display = "grid";

        // Add event listeners back to options
        addEventListenersToOptions();

        // Play the question video
        playVideo("question.mp4");
    });

    // Initial setup: add event listeners to options
    addEventListenersToOptions();
});
