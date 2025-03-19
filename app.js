const portfolioItems = document.querySelectorAll(".portfolio-item");
const modals = document.querySelectorAll(".modal");
const closeButtons = document.querySelectorAll(".close");

function PortfolioModal() {
    let currentIndex = 0;
    let currentModal = null;
    let modalImage = null;
    let modalTitle = null;
    let portfolioData = [];

    // **Preload portfolio data on page load**
    function loadPortfolioData() {
        portfolioItems.forEach((item) => {
            const imgElement = item.querySelector("img");
            const modalId = item.dataset.modal;
            const modalElement = document.getElementById(modalId);
            const modalTextElement = modalElement?.querySelector(".modal-text h3");
            
            if (imgElement && modalTextElement) {
                portfolioData.push({
                    imgSrc: imgElement.src,
                    title: modalTextElement.innerText,
                });
            }
        });
    }

    // Function to open a modal
    function openModal(modalId, index) {
        currentModal = document.getElementById(modalId);
        if (currentModal) {
            modalImage = currentModal.querySelector("img");
            modalTitle = currentModal.querySelector(".modal-text h3");

            currentIndex = index;
            updateModalContent(currentIndex);
            currentModal.style.display = "flex";

            adjustModalSize(currentModal);
            setTimeout(() => adjustModalPosition(currentModal), 10);
        }
    }

    // Function to close a modal
    function closeModal(modal) {
        if (modal) {
            modal.style.display = "none";
            currentModal = null;
        }
    }

    // Function to update the modal content (image + title)
    function updateModalContent(index) {
        if (!modalImage || !modalTitle || portfolioData.length === 0) return;
        modalImage.src = portfolioData[index].imgSrc;
        modalTitle.innerText = portfolioData[index].title;
        currentIndex = index;
    }

    // **Load data once when the page loads**
    loadPortfolioData();

    // Add click event listeners to portfolio items
    portfolioItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            const modalId = item.dataset.modal;
            openModal(modalId, index);
        });
    });

    // Add click event listeners to close buttons
    closeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            closeModal(button.closest(".modal"));
        });
    });

    // Close the modal if the user clicks outside of it
    window.addEventListener("click", (event) => {
        modals.forEach((modal) => {
            if (event.target == modal) {
                closeModal(modal);
            }
        });
    });

    // Add arrow navigation
    document.querySelectorAll(".left-arrow").forEach((arrow) => {
        arrow.addEventListener("click", function () {
            if (!currentModal) return;
            let newIndex = (currentIndex - 1 + portfolioData.length) % portfolioData.length;
            updateModalContent(newIndex);
        });
    });

    document.querySelectorAll(".right-arrow").forEach((arrow) => {
        arrow.addEventListener("click", function () {
            if (!currentModal) return;
            let newIndex = (currentIndex + 1) % portfolioData.length;
            updateModalContent(newIndex);
        });
    });

    // Keyboard navigation (optional)
    document.addEventListener("keydown", function (event) {
        if (!currentModal) return;
        if (event.key === "ArrowLeft") {
            let newIndex = (currentIndex - 1 + portfolioData.length) % portfolioData.length;
            updateModalContent(newIndex);
        } else if (event.key === "ArrowRight") {
            let newIndex = (currentIndex + 1) % portfolioData.length;
            updateModalContent(newIndex);
        } else if (event.key === "Escape") {
            closeModal(currentModal);
        }
    });

    // Function to adjust modal content size based on image aspect ratio
    function adjustModalSize(modal) {
        const img = modal.querySelector("img");
        if (img && img.naturalWidth && img.naturalHeight) {
            const modalContent = modal.querySelector(".modal-content");
            const modalText = modal.querySelector(".modal-text");
            let imgWidth = img.naturalWidth;
            let imgHeight = img.naturalHeight;
            const maxWidth = window.innerWidth * 0.8;
            const maxHeight = window.innerHeight * 0.8;

            // Constrain image dimensions to fit within window
            if (imgWidth > maxWidth) {
                imgHeight = (maxWidth / imgWidth) * imgHeight;
                imgWidth = maxWidth;
            }
            if (imgHeight > maxHeight) {
                imgWidth = (maxHeight / imgHeight) * imgWidth;
                imgHeight = maxHeight;
            }

            // Set image dimensions
            img.style.width = `${imgWidth}px`;
            img.style.height = `${imgHeight}px`;

            modalContent.style.width = `${imgWidth}px`;
            modalContent.style.height = `${imgHeight}px`;
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    PortfolioModal();
    modals.forEach((modal) => {
        modal.style.display = "none";
    });
});
