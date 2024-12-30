document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("questionVideo");
    const overlay = document.getElementById("overlay");
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

    // Show overlay only when question.mp4 ends
    video.addEventListener("ended", () => {
        if (video.currentSrc.includes("question.mp4")) {
            overlay.classList.remove("hidden-overlay");
            overlay.classList.add("visible-overlay");
        } else if (video.currentSrc.includes("incorrect.mp4")) {
            retryButton.classList.remove("hidden-retry");
            retryButton.classList.add("visible-retry");
        }
    });

    // Add event listeners to options
    options.forEach((option, index) => {
        option.addEventListener("click", () => {
            if (index === 2) { // opt3 is the correct option (0-based index)
                playVideo("correct.mp4");
            } else {
                playVideo("incorrect.mp4");
            }
        });
    });

    // Retry button functionality
    retryButton.addEventListener("click", () => {
        // Hide overlay and retry button before replaying question.mp4
        overlay.classList.add("hidden-overlay");
        overlay.classList.remove("visible-overlay");
        retryButton.classList.add("hidden-retry");
        retryButton.classList.remove("visible-retry");

        playVideo("question.mp4");
    });
});
