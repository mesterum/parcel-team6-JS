const imageUrls = [
    "https://ca.slack-edge.com/T05F0FBEZ4J-U05LNBNS1FV-bdc613eace33-512",
    "https://ca.slack-edge.com/T05F0FBEZ4J-U05LBUKH9H9-b0c3df3033a7-512",
    "https://ca.slack-edge.com/T05F0FBEZ4J-U05G5HZHM9N-56a05723e670-512",
    "https://ca.slack-edge.com/T05F0FBEZ4J-U05G5J0FZGQ-edc64a9e672e-512",
    "https://ca.slack-edge.com/T05F0FBEZ4J-U05KXFNSSHM-f3392e70383c-512",
    "https://ca.slack-edge.com/T05F0FBEZ4J-U05HY8RUVNE-07ba26c4feff-512"
];

const descriptions = [
    ["Andreea Vinereanu", "Developer"],
    ["Molnar Aczel Zsuzsanna", "Scrum Master&Developer"],
    ["Mihai Manole", "Team Leader&Developer"],
    ["Adrian Topa", "Developer"],
    ["Andrei Baragau", "Developer"],
    ["Cristina Macicasan", "Developer"]
];

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById('my-modal-footer');

    const closeModalButtons = document.querySelectorAll('.close-modal');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function () {
            modal.classList.add('is-hidden');
        });
    });

    const modalTitle = document.getElementById('modal-title');
    modalTitle.textContent = 'Filmoteka';

    const modalImage = document.querySelector('.modal-image');
    const modalDescription = document.querySelector('.modal-description');
    const groupGallery = document.querySelector('.group-gallery');

    const openModalButton = document.getElementById('openModalButton');
    openModalButton.addEventListener('click', function () {
        modal.classList.remove('is-hidden');
    });

    imageUrls.forEach((imageUrl, index) => {
        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.alt = "Image " + (index + 1);

        imageElement.addEventListener('click', () => {
            showModal(imageUrl, descriptions[index][0], descriptions[index][1]);
        });

        groupGallery.appendChild(imageElement);
    });

    function showModal(imageUrl, name, role) {
        modalImage.src = imageUrl;
        modalDescription.innerHTML = `<p><strong>Name:</strong> ${name}</p><p><strong>Role:</strong> ${role}</p>`;
        modal.classList.remove('is-hidden');
    }

    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.add('is-hidden');
        }
    });
});
