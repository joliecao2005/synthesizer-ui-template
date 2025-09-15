let introModal = document.getElementById("introDialog");
introModal.showModal();

document.getElementById("dialogCloseButton").addEventListener("click", () => {
  introModal.close();
});

introModal.addEventListener("close", toneInit);
