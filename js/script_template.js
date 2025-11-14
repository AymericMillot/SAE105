document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(location.search);
    const num = params.get('num');

    if (!num || !SAE[num]) {
        document.querySelector('.sae-main').innerHTML = '<p>SAÉ introuvable. <a href="Liste.html">Retour à la liste</a></p>';
        return;
    }

    const data = SAE[num];
    const title = document.querySelector('#sae-title');
    const description = document.querySelector('#sae-description');
    const competence = document.querySelector('#sae-competence');
    const pdfLink = document.querySelector('#pdf-link');
    const acList = document.querySelector('#ac-list');
    const resourceList = document.querySelector('#resource-list');

    title.textContent = `${num} — ${data.titre}`;
    description.innerHTML = data.description;
    competence.textContent = `Compétence${data['compétences'].length > 1 ? 's' : ''} : ${data['compétences'].join(', ')}`;
    pdfLink.href = `pdf/${num}.pdf`;

    const acItems = Object.entries(data.AC || {}).map(([code, details]) => {
        const justification = (details.justifier || '').trim();
        return `
            <li>
                <strong>${code}</strong>
                <p>${details.description_ac}</p>
                ${justification ? `<p class="justification">${justification}</p>` : ''}
            </li>
        `;
    }).join('');

    acList.innerHTML = acItems || '<li>Pas encore de justification associée.</li>';

    const resItems = Object.entries(data.ressources || {}).map(([code, label]) => `
        <li>
            <strong>${code}</strong>
            <p>${label}</p>
        </li>
    `).join('');

    resourceList.innerHTML = resItems;

    if (window.gsap) {
        gsap.from('.sae-hero', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' });
        gsap.from('.detail-card', { opacity: 0, y: 40, duration: 0.8, delay: 0.2, stagger: 0.15, ease: 'power3.out' });
    }
});
