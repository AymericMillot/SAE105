document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.sae-grid');
    const searchInput = document.querySelector('#sae-search');
    const resultCount = document.querySelector('#result-count');

    if (!grid) {
        return;
    }

    const buildCard = (numSae, data) => {
        const competencies = data['compétences'] || [];
        const tags = competencies.map(tag => `<span class="tag">${tag}</span>`).join('');
        const description = data.description.replace(/<br>/g, ' ');
        const snippet = description.length > 140 ? description.slice(0, 140).trim() + '…' : description;
        const searchable = [
            numSae,
            data.titre,
            ...competencies,
            ...Object.values(data.ressources || {})
        ].join(' ').toLowerCase();

        const markup = `
            <article class="sae-card">
                <div>
                    <p class="eyebrow">${numSae}</p>
                    <h3>${data.titre}</h3>
                    <p>${snippet}</p>
                </div>
                <div class="tags">${tags}</div>
                <div class="card-footer">
                    <span>Semestre ${data.semestre}</span>
                    <a href="template.html?num=${numSae}">Voir la fiche</a>
                </div>
            </article>
        `;

        return { markup, searchable };
    };

    const cards = Object.entries(SAE).map(([numSae, data]) => buildCard(numSae, data));

    const renderList = (filter = '') => {
        const normalized = filter.trim().toLowerCase();
        let html = '';
        let total = 0;

        cards.forEach(card => {
            if (!normalized || card.searchable.includes(normalized)) {
                html += card.markup;
                total++;
            }
        });

        grid.innerHTML = html;
        resultCount.textContent = total ? `${total} fiche${total > 1 ? 's' : ''} correspondante${total > 1 ? 's' : ''}` : 'Aucun résultat';

        if (window.gsap && grid.children.length) {
            gsap.from('.sae-card', { opacity: 0, y: 40, duration: 0.8, stagger: 0.08, ease: 'power3.out' });
        }
    };

    renderList();

    searchInput?.addEventListener('input', (event) => {
        renderList(event.target.value);
    });
});
