document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".button-secondary");
    buttons.forEach(button => {
        button.addEventListener("click", function() {
            const additionalInfoDiv = this.closest('.toplist-wrapper').querySelector('.additional-info-content');
            if (additionalInfoDiv.classList.contains('visible')) {
                additionalInfoDiv.classList.remove('visible');
                this.textContent = "MORE INFO";
            } else {
                additionalInfoDiv.classList.add('visible');
                this.textContent = "LESS INFO";
            }
        });
    });
});

const casinoListContainer = document.getElementById('casino-list');

function renderCasinoList(list) {
    list.forEach((item, index) => {
        const casinoItem = document.createElement('div');
        casinoItem.classList.add('toplist-wrapper', 'position-relative', 'mb-3', 'rounded-3');
        if (index === 0) {
            // casinoItem.classList.add('outline');
        }
        const position = index + 1;
        casinoItem.innerHTML = `
            <div class="toplist d-flex">
                <a class="toplist-logo-link" style="background-color: ${item.bg};" href="${item.link}">
                    <img src="images/${item.logo}" alt="${item.name}" loading="lazy">
                </a>
                <div class="toplist-details bg-white d-flex">
                    <div class="mobile-pos-container">
                        <span class="mobile-pos">${position}</span>
                    </div>
                    <div class="name-rating-col d-flex flex-column justify-content-center">
                        <a href="${item.link}"><span class="position">${position}.</span>${item.name}</a>
                        <div class="rating">${renderStars(item.rating)}</div>
                    </div>
                    <div class="bonus-col d-flex flex-column justify-content-center">
                        <div class="bonus-top">${item.bonustop}</div>
                        <div class="bonus-bottom">${item.bonusbottom}</div>
                    </div>
                    <div class="payment-methods-col">
                        <div class="payment-methods d-flex justify-content-center">
                            ${item.paymentmethods.map(method => `
                                <div class="payment-image">
                                    <img src="images/payment/${method}.png" alt="${method}">
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <div class="toplist-buttons d-flex flex-column justify-content-center gap-3">
                    <a href="${item.link}" class="button-success" rel="nofollow" target="_blank">Play now!</a>
                    <button class="button-secondary">More info</button>
                </div>
            </div>
            <div class="additional-info">
                <div class="additional-info-content">
                    ${renderAdditionalInfo(item)}
                </div>
            </div>
            <div class="terms text-center">${item.compliancetext}</div>
        `;
        casinoListContainer.appendChild(casinoItem);
    });
}

function renderStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars += '<i class="fa-solid fa-star"></i>'; // Full star
        } else if (i - 1 < rating && rating < i) {
            stars += '<i class="fa-regular fa-star-half-stroke"></i>'; // Half star
        } else {
            stars += '<i class="fa-regular fa-star"></i>'; // Empty star
        }
    }
    return stars;
}

function renderAdditionalInfo(item) {
    return `
        <div class="info-col bg-white">
            <p class="info-title" data-title="Casino Information">Casino Information</p>
            <div class="info-rating-wrap d-flex align-items-center justify-content-between">
                <p class="fw-semibold"><i class="fa-regular fa-calendar-check me-2"></i> Year Established</p>
                <p>${item.yearestablished}</p>
            </div>
            <div class="info-rating-wrap d-flex align-items-center justify-content-between">
                <p class="fw-semibold"><i class="fa-solid fa-dice-two me-2"></i> Number of Games</p>
                <p>${item.numbergames}</p>
            </div>
            <div class="info-rating-wrap d-flex align-items-center justify-content-between">
                <p class="fw-semibold"><i class="fa-solid fa-gauge-simple-high me-2"></i> Payout Speed</p>
                <p>${item.payoutspeed}</p>
            </div>
            <div class="info-rating-wrap d-flex align-items-center justify-content-between">
                <p class="fw-semibold"><i class="fa-solid fa-coins me-2"></i> Payout Rate</p>
                <p>${item.payoutrate}</p>
            </div>
        </div>
        <div class="info-col bg-white info-pm">
            <p class="info-title" data-title="Payment Methods">Payment Methods</p>
            <div class="payment-methods d-flex justify-content-center">
                ${item.paymentmethods.map(method => `
                    <div class="payment-image">
                        <img src="images/payment/${method}.png" alt="${method}">
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="info-col bg-white">
            <p class="info-title" data-title="Key Features">Key Features</p>
            <div class="info-brand">
                ${item.usps.map(usp => `
                    <div class="info-brand-wrap d-flex align-items-center">
                        <i class="fa-solid fa-circle-check me-2"></i>
                        <p>${usp}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

renderCasinoList(casinoList);

// Function to return the Date
function getFormattedDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    // Helper function to get the ordinal suffix (st, nd, rd, th)
    function getOrdinalSuffix(day) {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }

    return `${month} ${year}`;
}

document.getElementById('current-date').innerHTML = getFormattedDate();

function getYear() {
    const date = new Date();
    const year = date.getFullYear();
    return `${year}`;
}

document.getElementById('year').innerHTML = getYear();