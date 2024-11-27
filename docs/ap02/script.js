const tipoPokemonMap = { fogo: "fire", agua: "water", grama: "grass", eletrico: "electric", normal: "normal", psiquico: "psychic" };
const regioesParaGeracao = { kanto: 1, johto: 2, hoenn: 3, sinnoh: 4, unova: 5, kalos: 6, alola: 7, galar: 8 };

document.getElementById('search-type-btn').onclick = async () => {
    const tipo = document.getElementById('pokemon-type').value.toLowerCase();
    const tipoEmIngles = tipoPokemonMap[tipo];
    if (!tipoEmIngles) return alert('Tipo inválido!');

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${tipoEmIngles}`);
        const data = await response.json();

        let galleryHTML = '';
        for (const pokemon of data.pokemon.slice(0, 10)) {
            const pokemonDetails = await fetch(pokemon.pokemon.url);
            const pokemonData = await pokemonDetails.json();

            galleryHTML += `
                <div class="pokemon-item">
                    <div class="pokemon-card">
                        <div class="pokemon-card-front">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png" alt="${pokemonData.name}">
                            <p>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</p>
                        </div>
                        <div class="pokemon-card-back">
                            <img src="imagens/carta-pokemon-virada.png" alt="Carta Pokémon Virada">
                        </div>
                    </div>
                </div>
            `;
        }
        document.getElementById('pokemon-gallery').innerHTML = galleryHTML;

    } catch (error) {
        alert('Erro ao buscar Pokémons.');
    }
};

document.getElementById('search-region-btn').onclick = async () => {
    const regiao = document.getElementById('pokemon-region').value.toLowerCase();
    const geracao = regioesParaGeracao[regiao];
    if (!geracao) return alert('Região inválida!');

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/generation/${geracao}`);
        const data = await response.json();

        let galleryHTML = '';
        for (const pokemon of data.pokemon_species) {
            const pokemonDetails = await fetch(pokemon.url);
            const pokemonData = await pokemonDetails.json();

            galleryHTML += `
                <div class="pokemon-item">
                    <div class="pokemon-card">
                        <div class="pokemon-card-front">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png" alt="${pokemonData.name}">
                            <p>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</p>
                        </div>
                        <div class="pokemon-card-back">
                            <img src="imagens/carta-pokemon-virada.png" alt="Carta Pokémon Virada">
                        </div>
                    </div>
                </div>
            `;
        }
        document.getElementById('pokemon-region-gallery').innerHTML = galleryHTML;

    } catch (error) {
        alert('Erro ao buscar Pokémons da região.');
    }
};

document.getElementById('pokemon-form').onsubmit = async (e) => {
    e.preventDefault();
    const pokemonName = document.getElementById('pokemon-name').value.toLowerCase();
    if (!pokemonName) return alert('Por favor, insira o nome do Pokémon.');

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) return alert('Pokémon não encontrado.');
        const pokemonData = await response.json();

        document.getElementById('pokemon-data').innerHTML = `
            <div class="pokemon-item">
                <div class="pokemon-card">
                    <div class="pokemon-card-front">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png" alt="${pokemonData.name}">
                        <p><strong>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</strong></p>
                        <p><strong>Peso:</strong> ${(pokemonData.weight / 10).toFixed(1)} kg</p>
                        <p><strong>Altura:</strong> ${(pokemonData.height / 10).toFixed(1)} m</p>
                    </div>
                    <div class="pokemon-card-back">
                        <img src="imagens/carta-pokemon-virada.png" alt="Carta Pokémon Virada">
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        alert('Erro ao buscar dados do Pokémon.');
    }
};
