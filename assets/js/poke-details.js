const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('pokemon');
var pokemon = undefined;
const body = document.getElementById('body');
var myMoves = [];
var totalStats = 0;

const getColor = (width) => {
  if(width < 25){
    return "red";
  }
  else if(width < 50){
    return "orange";
  }
  else if(width < 75){
    return "lightgreen";
  }
  else
    return "green"; 
}


const getTotalColor = (width) => {
  if(width < 150){
    return "red";
  }
  else if(width < 300){
    return "orange";
  }
  else if(width < 450){
    return "lightgreen";
  }
  else
    return "green"; 
}

const slider = () =>{
  const slides = document.querySelectorAll(".details__slide");

  // loop through slides and set each slides translateX property to index * 100% 
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${indx * 100}%)`;
  });

  // select next slide button
  const nextSlide = document.querySelector(".btn-next");

  // current slide counter
  let curSlide = 0;
  // maximum number of slides
  let maxSlide = slides.length - 1;

  // add event listener and navigation functionality
  nextSlide.addEventListener("click", function () {
    // check if current slide is the last and reset current slide
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }

  //   move slide by -100%
    slides.forEach((slide, indx) => {
      slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
    });
  });

  // select prev slide button
  const prevSlide = document.querySelector(".btn-prev");

  // add event listener and navigation functionality
  prevSlide.addEventListener("click", function () {
    // check if current slide is the first and reset current slide to last
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }

    //   move slide by 100%
    slides.forEach((slide, indx) => {
      slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
    });
  });
}


function loadDetails(){
  pokeApi.getPokemon(myParam).then((pokemonDetail) => {
    console.log(pokemonDetail);
    pokemonDetail.stats.forEach((stat) => {
      totalStats += stat[1];
    })

    
    const newDetail = `
    <div class = "container ${pokemonDetail.type}">
        <header class = "header">
            <div class = "header__buttons" >
                <a href="index.html">
                    <img src="assets/images/back-buttons-multimedia-svgrepo-com.svg" alt="" class="back-btn">
                </a>
                <a href="">
                    <img src="assets/images/heart-svgrepo-com.svg" alt="" class="like-btn">
                </a>
            </div>
            <div class="header__pokemon">
                <div>
                    <h2 class="header__pokemon--name">${pokemonDetail.name}</h2>
                    <ol class="header__pokemon--types">
                        ${pokemonDetail.types.map ((type) => `<li class="header__pokemon--type ${pokemonDetail.types[0]}">${type}</li>`).join(" ")}   
                    </ol>
                </div>
                <div class="header__pokemon--number">
                   #0${pokemonDetail.number}
                </div>
            </div>
            <img class="pokemon__img" src="${pokemonDetail.image}" alt="${pokemonDetail.image}" srcset=""> 
        </header>
        <section class="details">
            <div class="details__slider">
                <!-- slide 1 -->
                <div class="details__slide">
                    <h2 class="details__title">
                        About
                    </h2>
                    <ol class="information__list">
                        <li class="information__item">
                            <span class="information__title">
                                Species
                            </span>
                            <span class="information__detail">
                              ${pokemonDetail.specie}
                            </span>
                        </li>
                        <li class="information__item">
                            <span class="information__title">
                                Heigth
                            </span>
                            <span class="information__detail">
                              ${pokemonDetail.height}
                            </span>
                        </li>
                        <li class="information__item">
                            <span class="information__title">
                                Weigth
                            </span>
                            <span class="information__detail">
                              ${pokemonDetail.weight}
                            </span>
                        </li>
                        <li class="information__item">
                            <span class="information__title">
                                Abiliites
                            </span>
                            <span class="information__detail">
                              ${pokemonDetail.abilities.map ((ability) => `${ability}`).join(", ")} 
                            </span>
                        </li>
                    </ol>
                    <h3 class="details__subtitle">
                        Specie
                    </h3>
                    <ol class="information__list">
                        <li class="information__item">
                            <span class="information__title">
                                Gender
                            </span>
                            <span class="information__detail">
                                Seed
                            </span>
                        </li>
                        <li class="information__item">
                            <span class="information__title">
                                Egg Group
                            </span>
                            <span class="information__detail">
                                Seed
                            </span>
                        </li>
                        <li class="information__item">
                            <span class="information__title">
                                Egg Cycle
                            </span>
                            <span class="information__detail">
                                Seed
                            </span>
                        </li>
                    </ol>
                </div>
                <!-- slide 2 -->
                <div class="details__slide base-status">
                    <p class="details__title">
                        Base Status
                    </p>
                    ${pokemonDetail.stats.map ((stat) => `
                      <div class="details__stat">
                        <p class="status-name">${stat[0]}</p>
                        <p class="status-value">${stat[1]}</p>
                        <div class="status-bar" style="--background: ${getColor(stat[1])}; --bar-width:${stat[1].toString()}%"></div>
                      </div>`).join(" ")}
                      <div class="details__stat">
                        <p class="status-name">Total</p>
                        <p class="status-value">${totalStats}</p>
                      <div class="status-bar" style="--background: ${getColor((totalStats/6))}; --bar-width:${(totalStats/6).toString()}%"></div>
                    </div>
                </div>
                <!-- slide 3 -->
                <div class="details__slide">
                    <p class="details__title">
                        Evolution
                    </p>
                    
                </div>
                <!-- slide 4 -->
                <div class="details__slide">
                    <p class="details__title">
                        Moves
                    </p>
                    <div id = "details__moves" class="details__moves">
                      
                    </div>
                </div>
                <!-- Control buttons -->
                <button class="details__btn btn-next">></button>
                <button class="details__btn btn-prev"><
              </div>
            <div class="details__section">
            
            </div>
        </section>   
    </div> `

    body.innerHTML += newDetail;
    slider();
    const pageTitle = pokemonDetail.name.charAt(0).toUpperCase() + pokemonDetail.name.slice(1);
    document.title = pageTitle;
    return pokemonDetail;
  })
  .then((pokemonDetail) => {
    fetch(pokemonDetail.species)
    .then((response) => response.json())
    .then((response) => fetch(response.evolution_chain.url)
    .then((evolutionChain) => evolutionChain.json())
    .then((pokeApi.getEvolutions)))
    return pokemonDetail;
    }
  )
  .then((pokemonDetail) => pokemonDetail.moves.map(pokeApi.getMove))
  .then(pokemonDetail => Promise.all(pokemonDetail))
  .then((pokemonMoves) => {
    console.log(pokemonMoves.length);
    const moves = pokemonMoves.map(move =>

      `<div class= "details__move ${move[2]}">
          ${move[1]}
       </div> `
    ).join(" ");

    const details__moves = document.getElementById('details__moves');
    details__moves.innerHTML += moves;

  })
  
  
}



loadDetails();
/* <-------------- Slider ----------------------------> */


