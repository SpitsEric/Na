const portfolioItems = document.querySelectorAll(".portfolio-item");
const modals = document.querySelectorAll(".modal");
const closeButtons = document.querySelectorAll(".close");

function PortfolioModal() {
    // Function to open a modal
    function openModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "flex";
        adjustModalSize(modal); // Adjust the modal size first
        setTimeout(() => adjustModalPosition(modal), 10); // Adjust the position after the display change
      }
    }
  
    // Function to close a modal
    function closeModal(modal) {
      modal.style.display = "none";
    }
  
    // Add click event listeners to portfolio items
    portfolioItems.forEach((item) => {
      item.addEventListener("click", () => {
        const modalId = item.dataset.modal;
        const modal = document.getElementById(modalId);
        const img = modal.querySelector("img");
        openModal(modalId);
        adjustModalSize(modal, img); // Call adjustModalSize here
      });
    });
  
    // Add click event listeners to close buttons
    closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const modal = button.closest(".modal");
        if (modal) {
          closeModal(modal);
        }
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
  
    // Function to adjust modal content size based on image aspect ratio
    function adjustModalSize(modal, img) {
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