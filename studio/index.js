document.addEventListener('DOMContentLoaded', () => {
    const cardBlockInner = document.querySelector('.card-block-inner'); 

    const data = generateData(100);

    let searchTerm = '';

    function generateData(size) {
        let dataArr = [];
        const names = ["Алексей", "Мария", "Сергей", "Анна", "Дмитрий", "Екатерина", "Иван", "Ольга", "Павел", "Наталья"];
        const types = ["Российские", "Иностранные", "Вокалисты", "Пародисты", "Чтецы аудиокниг"];
        const voiceType = ["Мужской", "Женский", "Детский"];
        const timbreType = ["Низкий", "Средний", "Высокий"];
        const peculiarities = ["Быстрый", "Популярный", "Известный"];
        const ageType = ["Молодой", "Средний", "Пожилой"];
        const specializationType = ["Реклама", "Закадр/дубляж", "Игровые"];
        const minPrice = 50;
        const maxPrice = 500;

        for (let i = 0; i < size; i++) {
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomType = types[Math.floor(Math.random() * types.length)];
            const randomVoiceType = voiceType[Math.floor(Math.random() * voiceType.length)];
            const randomPrice = Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice;
            const randomTimbreType = timbreType[Math.floor(Math.random() * timbreType.length)];
            const randomPeculiarity = peculiarities[Math.floor(Math.random() * peculiarities.length)];
            const randomAgeType =  ageType[Math.floor(Math.random() * ageType.length)];
            const randomSpecializationType = specializationType[Math.floor(Math.random() * specializationType.length)];

            dataArr.push({
                name: `Имя диктора: ${randomName}`,
                specialization: `Специализация диктора ${i}`,
                photoSrc: './images/author-icon.png',
                audioSrc: './audio/test-audio.mp3',
                price: `${randomPrice}`,
                voiceType: `${randomVoiceType}`,
                timbreType: `${randomTimbreType}`,
                peculiarities: `${randomPeculiarity}`,
                ageType: `${randomAgeType}`,
                specializationType: `${randomSpecializationType}`,
                type: `${randomType}`,
                description: `Описание диктора ${i}`
            });
        }
        return dataArr;
    }

    function sortByName(ascending) {
        dataCopy = dataCopy.sort((a, b) => {
            if (a.name < b.name) return ascending ? -1 : 1;
            if (a.name > b.name) return ascending ? 1 : -1;
            return 0;
        });
        console.log('Sorted by Name:', dataCopy);
    }

    function sortByPrice(ascending) {
        dataCopy = dataCopy.sort((a, b) => ascending ? a.price - b.price : b.price - a.price);
        console.log('Sorted by Price:', dataCopy);
    }

    function sortByRangePrice(min, max, arr) {
        const filteredArr = arr.filter(num => num.price >= min && num.price <= max);
        return filteredArr;
    }

    function createCards(dataArr) {
        dataArr.forEach((card) => {
            createCard(card.name, card.specialization, card.photoSrc, card.audioSrc, card.price, card.description);
        })
    }

    let dataCopy = [...data];

    const itemsPerPage = 10;
    let currentPage = 1;

    let chunkedArr = chunkArray(data, itemsPerPage);

    console.log(chunkedArr);
    
    createCards(chunkedArr[currentPage - 1]);
    
    let paginationBtn = document.querySelector('.pagination-btn');  

    const card = document.querySelector('.card');
    let cardArr = document.querySelectorAll('.card');
    const expandedCardBtn = document.querySelector('.expanded-btn');
    let audioArr = document.querySelectorAll('.audio-player');
    const playPauseBtnArr = document.querySelectorAll('.play-btn');
    let playPauseBtnImgArr = document.querySelectorAll('.play-btn img');
    const currentTimerArr = document.querySelectorAll('.timer-current');
    const timerLengthArr = document.querySelectorAll('.timer-length');
    const progressContainerArr = document.querySelectorAll('.progress-container')
    const progressArr = document.querySelectorAll('.progress');
    const timePopupArr = document.querySelectorAll('.time-popup');
    const paginationContainer = document.querySelector('.pagination');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dropBtn = document.querySelector('.dropbtn');
    const dropdownLinkArr = document.querySelectorAll('.dropdown-link');
    const sortAscName = document.querySelector('.sort-ascname');
    const sortDescName = document.querySelector('.sort-descname');
    const sortAscPrice = document.querySelector('.sort-ascprice');
    const sortDescPrice = document.querySelector('.sort-descprice');
    const filterLinkArr = document.querySelectorAll('.filter-link');
    const showMoreBtn = document.querySelector('.show-more-btn');
    const aside = document.querySelector('.filter-aside');
    const asideFilterBtn = document.querySelector('.filter-btn');
    const closeAsideBtn = document.querySelector('.filter-aside-close-btn');
    const asideBtn = document.querySelector('.aside-find-btn');
    const asideInput = document.querySelector('.aside-input');
    const checkboxArr = document.querySelectorAll('.checkbox-container input');
    const voiceTypeArr = document.querySelectorAll('.checkbox-container.voice-type input');
    const sliderLine = document.querySelector('.slider-line');
    const slider1 = document.getElementById('slider-1');
    const slider2 = document.getElementById('slider-2');
    const input1 = document.getElementById('input-1');
    const input2 = document.getElementById('input-2');

    let prices = data.map(object => object.price);
    let maxPrice = Math.max(...prices);
    let minPrice = 0;

    let categoryName = 'default';
    let searchText = '';
    let sortType = 'default';
    let min = 0;
    let max = maxPrice;

    function showArr(arr) {
        chunkedArr = chunkArray(arr, itemsPerPage);
        currentPage = 1;
        setPage(currentPage);
        createCards(chunkedArr[currentPage - 1]);    
    }

    function searchFunc() {
  
        if (categoryName !== 'default') {
            deleteCards();
            dataCopy = filterByType(categoryName);
            chunkedArr = chunkArray(dataCopy, itemsPerPage);
            currentPage = 1;
            setPage(currentPage);
            createCards(chunkedArr[currentPage - 1]);   
        } 
   
        if (searchText !== '') {
            deleteCards();
            dataCopy = searchByNameArr(searchText, dataCopy);        
            chunkedArr = chunkArray(dataCopy, itemsPerPage);
            currentPage = 1;
            setPage(currentPage);
            createCards(chunkedArr[currentPage - 1]);
        }

        if (min !== minPrice || max === maxPrice) {
            console.log(min);
            console.log(max);
            deleteCards();   
            dataCopy = sortByRangePrice(min, max, dataCopy);
            console.log(dataCopy);
            chunkedArr = chunkArray(dataCopy, itemsPerPage);
            currentPage = 1;
            setPage(currentPage);
            createCards(chunkedArr[currentPage - 1]);
        }

        if (sortType !== 'default') {
            if (sortType === 'sortAscName') {
                deleteCards();
                sortByName(true);
                chunkedArr = chunkArray(dataCopy, itemsPerPage);
                currentPage = 1;
                setPage(currentPage);
                createCards(chunkedArr[currentPage - 1]);
            } else if (sortType === 'sortDescName') {
                deleteCards();
                sortByName(false);
                chunkedArr = chunkArray(dataCopy, itemsPerPage);
                currentPage = 1;
                setPage(currentPage);
                createCards(chunkedArr[currentPage - 1]);
            } else if (sortType === 'sortAscPrice') {
                deleteCards();
                sortByPrice(true);
                chunkedArr = chunkArray(dataCopy, itemsPerPage);
                currentPage = 1;
                setPage(currentPage);
                createCards(chunkedArr[currentPage - 1]);
            } else if (sortType === 'sortDescPrice') {
                deleteCards();
                sortByPrice(false);
                chunkedArr = chunkArray(dataCopy, itemsPerPage);
                currentPage = 1;
                setPage(currentPage);
                createCards(chunkedArr[currentPage - 1]);
            }
        }
    }

    console.log(minPrice);
    console.log(maxPrice);
    
    let slider1Pos = min;
    let slider2Pos = max;

    updateInputs();

    initSlider();

    input1.addEventListener('input', function(event) {
        console.log('input');
        const rect = sliderLine.getBoundingClientRect();
        let inputValue = Number(event.target.value);
        if (inputValue <= max) {
            min = Number(event.target.value);           
        } else {
            input1.value = max;
            inputValue = max;
            min = max; 
        } 
        slider1.style.left = (inputValue / max) * rect.width + 'px';
        searchFunc();
    })
    
    
    input2.addEventListener('input', function(event) {
        console.log('input');
        const rect = sliderLine.getBoundingClientRect();
        max = Number(event.target.value);
    
        slider2.style.left = (Number(event.target.value) / max) * rect.width + 'px';
        slider1.style.left = (min / max) * rect.width + 'px';

        searchFunc();
    })

    function initSlider() {
        const rect = sliderLine.getBoundingClientRect();
        slider1.style.left = 0 * rect.width + 'px';
        slider2.style.left = 1 * rect.width + 'px';
    }

    function updateInputs() {
        const rect = sliderLine.getBoundingClientRect();

        input1.value = slider1Pos;
        input2.value = slider2Pos;
    }

function moveSlider(slider, event) {
  const rect = sliderLine.getBoundingClientRect();
  let newLeft = event.clientX - rect.left;

  if (newLeft < 0) {
    newLeft = 0;
  } else if (newLeft > rect.width) {
    newLeft = rect.width;
  }

  slider.style.left = newLeft + 'px';

  if (slider === slider1) {
    slider1Pos = Math.round((newLeft / rect.width) * max);
    console.log(newLeft / rect.width);
    if (slider1Pos > slider2Pos) {
      slider1Pos = slider2Pos;
    }
    slider.style.left = (slider1Pos / max) * rect.width + 'px';
  } else {
    slider2Pos = Math.round((newLeft / rect.width) * max);
    if (slider2Pos < slider1Pos) {
      slider2Pos = slider1Pos;
    }
    slider.style.left = (slider2Pos / max) * rect.width + 'px';
  }

  updateInputs();
}

slider1.addEventListener('mousedown', (e) => {
  function onMouseMove(event) {
    moveSlider(slider1, event);
  }

  document.addEventListener('mousemove', onMouseMove);

  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', onMouseMove);
  }, { once: true });
});

slider2.addEventListener('mousedown', (e) => {
  function onMouseMove(event) {
    moveSlider(slider2, event);
  }

  document.addEventListener('mousemove', onMouseMove);

  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', onMouseMove);
  }, { once: true });
});

    let filtrationArr = [];
    let filtrationGroups = [];

    function generateSex(searchString, filterArr) {
        const resultArr = filterArr.filter(item => item.voiceType === searchString);
        console.log(resultArr);
        return resultArr;
    }

    function generateTimbre(searchString, filterArr) {
        const resultArr = filterArr.filter(item => item.timbreType === searchString);
        console.log(resultArr);
        return resultArr;
    }

    function generatePeculiarity(searchString, filterArr) {
        const resultArr = filterArr.filter(item => item.peculiarities === searchString);
        console.log(resultArr);
        return resultArr;
    }

    function generateSpecialization(searchString, filterArr) {
        const resultArr = filterArr.filter(item => item.specializationType === searchString);
        console.log(resultArr);
        return resultArr;
    }

    function filterBySex(searchString, filterArr) {
        deleteCards();
        const resultArr = filterArr.filter(item => item.voiceType === searchString);
        if (filtrationArr.length === 0) {
            filtrationArr = resultArr;
        } else {
            filtrationArr = [...new Set([...filtrationArr, ...resultArr])];
        }
        filtrationArr = [...new Set([...filtrationArr, ...resultArr])];
        filtrationGroups.push(searchString);

        chunkedArr = chunkArray(filtrationArr, itemsPerPage);
        currentPage = 1;
        setPage(currentPage);
        createCards(chunkedArr[currentPage - 1]);
        return resultArr;
    }

    function filterByTimbre(searchString, filterArr) {
        deleteCards();
        const resultArr = filterArr.filter(item => item.timbreType === searchString);
        if (filtrationArr.length === 0) {
            filtrationArr = resultArr;
        } else {
            filtrationArr = [...new Set([...filtrationArr, ...resultArr])];
        }
        chunkedArr = chunkArray(filtrationArr, itemsPerPage);
        currentPage = 1;
        setPage(currentPage);
        createCards(chunkedArr[currentPage - 1]);
        return resultArr;
    }

    function filterByPecualiarities(searchString, filterArr) {
        const resultArr = filterArr.filter(item => item.peculiarities === searchString);
        return resultArr;
    }

    function filterBySpecializationType(searchString, filterArr) {
        const resultArr = filterArr.filter(item => item.specializationType === searchString);
        return resultArr;
    }

    function filterByAgeType(searchString, filterArr) {
        const resultArr = filterArr.filter(item => item.ageType === searchString);
        return resultArr;
    }

    function getSelectedValues(groupName) {
        return Array.from(document.querySelectorAll(`input[name="${groupName}"]:checked`))
                    .map(checkbox => checkbox.value);
    }
  
    function findCommonElements(...arrays) {
        const nonEmptyArrays = arrays.filter(array => array.length > 0);
    
        if (nonEmptyArrays.length === 0) return [];
        
        return nonEmptyArrays.reduce((commonElements, currentArray) => {
            return commonElements.filter(element => currentArray.includes(element));
        });
    }

    let isSearch = false;

    checkboxArr.forEach((checkbox) => {
        checkbox.addEventListener('change', function(e) {
            const selectedVoiceTypes = getSelectedValues('voice-type');
            console.log(selectedVoiceTypes);
            const selectedTimbre = getSelectedValues('timbre');
            console.log(selectedTimbre);
            const selectedPeculiarity = getSelectedValues('peculiarity');
            console.log(selectedPeculiarity)
            const selectedAge = getSelectedValues('age');
            console.log(selectedAge);
            const selectedSpecialization = getSelectedValues('specialization');
            console.log(selectedSpecialization);
            console.log('checked');
            console.log(e.target.value);
            console.log(e.target.checked);
            let isChecked = e.target.checked;
            let checkBoxValue = e.target.value;
            let arr = [];
            let voiceArr = [];
            let timbreArr = [];
            let peculiarityArr = [];
            let specializationArr = [];

            searchFunc();

            selectedVoiceTypes.forEach((voiceType) => {
                if (voiceType === 'man') {
                    voiceArr = [...new Set([...voiceArr, ...generateSex('Мужской', dataCopy)])];
                } else if (voiceType === 'woman') {
                    voiceArr = [...new Set([...voiceArr, ...generateSex('Женский', dataCopy)])];
                } else if (voiceType === 'child') {
                    voiceArr = [...new Set([...voiceArr, ...generateSex('Детский', dataCopy)])];
                }
            })

            selectedTimbre.forEach((timbreType) => {
                if (timbreType === 'high') {
                    timbreArr = [...new Set([...timbreArr, ...generateTimbre('Высокий', dataCopy)])];
                } else if (timbreType === 'medium') {
                    timberArr = [...new Set([...timbreArr, ...generateTimbre('Средний', dataCopy)])];
                } else if (timbreType === 'low') {
                    timbreArr = [...new Set([...timbreArr, ...generateTimbre('Низкий', dataCopy)])];
                }
            })

            selectedPeculiarity.forEach((peculiarity) => {
                if (peculiarity === 'fast') {
                    peculiarityArr = [...new Set([...peculiarityArr, ...generatePeculiarity('Быстрый', dataCopy)])];
                } else if (peculiarity === 'popular') {
                    peculiarityArr = [...new Set([...peculiarityArr, ...generatePeculiarity('Популярный', dataCopy)])];
                } else if (peculiarity === 'famous') {
                    peculiarityArr = [...new Set([...peculiarityArr, ...generatePeculiarity('Известный', dataCopy)])];
                }
            })

            selectedSpecialization.forEach((specialization) => {
                if (specialization === 'ad') {
                    specializationArr = [...new Set([...specializationArr, ...generateSpecialization('Реклама', dataCopy)])];
                } else if (specialization === 'offScreen') {
                    specializationArr = [...new Set([...specializationArr, ...generateSpecialization('Закадр/дубляж', dataCopy)])];
                } else if (specialization === 'gaming') {
                    specializationArr = [...new Set([...specializationArr, ...generateSpecialization('Игровые', dataCopy)])];
                }
            })

            arr = findCommonElements(voiceArr, timbreArr, peculiarityArr, specializationArr);
            
            console.log('Arr');
            console.log(arr);
            deleteCards();
            chunkedArr = chunkArray(arr, itemsPerPage);
            currentPage = 1;
            setPage(currentPage);
            createCards(chunkedArr[currentPage - 1]);            
        })
    }) 

    asideBtn.addEventListener('click', function() {
        searchText = asideInput.value.trim().toLowerCase();
        searchFunc();
    });

    function searchByName(name) {
        return dataCopy.filter(item => item.name.toLowerCase().includes(name));
    }

    function searchByNameArr(name, arr) {
        return arr.filter(item => item.name.toLowerCase().includes(name));
    }

    asideFilterBtn.addEventListener('click', function() {
        if (aside.style.display === "none" || aside.style.display === "") {
            aside.style.display = "block";
            setTimeout(function() {
                aside.classList.add('show');
            }, 10);
            initSlider();
        } else {
            aside.classList.remove('show');
            setTimeout(function() {
                aside.style.display = "none";
            }, 300);
        }
    });
    
    closeAsideBtn.addEventListener('click', function() {
        aside.classList.remove('show');
        setTimeout(function() {
            aside.style.display = "none";
        }, 300);
    });
    

    showMoreBtn.addEventListener('click', function(e) {
        if (currentPage < chunkedArr.length) {
            currentPage++;
            setPage(currentPage);
            createCards(chunkedArr[currentPage - 1]);
        }

    })

    filterLinkArr.forEach((link) => {
        link.addEventListener('click', function(e) {
            categoryName = e.target.textContent;
            searchFunc();
        })
    })

    dropdownLinkArr.forEach((link) => {
        link.addEventListener('click', function(e) {
            dropBtn.textContent = e.target.textContent;
        })
    })

    function filterByType(typeString) {
        const resultArr = [];
        for (let i = 0; i < data.length; i++) {
            if (typeString === data[i].type) {
                resultArr.push(data[i]);
            }
        }
        console.log(resultArr)
        return resultArr;
    }

    sortAscName.addEventListener('click', function(e) {
        sortType = 'sortAscName';
        searchFunc();
    })

    sortDescName.addEventListener('click', function(e) {
        sortType = 'sortDescName';
        searchFunc();
    })

    sortAscPrice.addEventListener('click', function(e) {
        sortType = 'sortAscPrice';
        searchFunc();
    })

    sortDescPrice.addEventListener('click', function(e) {
        sortType = 'sortDescPrice';
        searchFunc();
    })
   
    function deleteCards() {
        while (cardBlockInner.firstChild) {
            cardBlockInner.removeChild(cardBlockInner.firstChild);
          }
    }

    function deleteBtns() {
        let paginationBtnArr = document.querySelectorAll('.pagination-btn');
        paginationBtnArr.forEach((btn) => {
            btn.remove();
        })
    }

    function setBtnStatus() {
        if (currentPage !== 1) {
            prevBtn.classList.remove('disabled');
        } else if (currentPage === 1) {
                prevBtn.classList.add('disabled');
        }

        if (currentPage === chunkedArr.length) {
            nextBtn.classList.add('disabled');
        } else {
            nextBtn.classList.remove('disabled');
        }
    }

    function setPage() {
        deleteBtns();
        let currentButton = document.createElement('button');
        currentButton.className = 'pagination-btn selected';
        currentButton.textContent = currentPage;
        paginationContainer.insertBefore(currentButton, nextBtn);
        for (let i = 0; i < 3; i++) {
            if (currentPage - (i + 1) > 0) {
                let paginationBtn = document.querySelector('.pagination-btn');

                let buttonStart = document.createElement('button');
                buttonStart.className = 'pagination-btn';
                buttonStart.textContent = currentPage - (i + 1);
                paginationContainer.insertBefore(buttonStart, paginationBtn);
            } else {
            }
        }

        for (let i = 0; i < 3; i++) {
            if (currentPage + (i + 1) <= chunkedArr.length) {
                let paginationBtn = document.querySelector('.pagination-btn');

                let buttonStart = document.createElement('button');
                buttonStart.className = 'pagination-btn';
                buttonStart.textContent = currentPage + (i + 1);
                paginationContainer.insertBefore(buttonStart, nextBtn);
            } else {
                break;

            }
        }

        let paginationBtnArr = document.querySelectorAll('.pagination-btn');
        paginationBtnArr.forEach((btn) => {
        btn.addEventListener('click', function(e) {
            deleteCards();
            currentPage = Number(e.target.textContent);
            console.log(currentPage);
            setPage();
            createCards(chunkedArr[currentPage - 1], itemsPerPage);
        })
    })
        setBtnStatus();
    }

    function setNextBtn() {
        setPage();
    }

    function setPrevBtn() {
        setPage();
    }

    let paginationBtnArr = document.querySelectorAll('.pagination-btn');
    paginationBtnArr.forEach((btn) => {
        btn.addEventListener('click', function(e) {
            deleteCards();
            currentPage = Number(e.target.textContent);
            console.log(currentPage);
            setPage();
            createCards(chunkedArr[currentPage - 1], itemsPerPage);
        })
    })

    nextBtn.addEventListener('click', function() {
        if (currentPage < chunkedArr.length) {
            deleteCards();
           
            currentPage++;
            setNextBtn();
            createCards(chunkedArr[currentPage - 1], itemsPerPage);
            console.log(currentPage);
        }
        
    })

    prevBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            deleteCards();
        console.log(chunkedArr[currentPage - 1]);
        currentPage--;
        setPrevBtn();
     
        createCards(chunkedArr[currentPage - 1], itemsPerPage);
        console.log(currentPage);
        } 
    })

    function chunkArray(array, size) {
        const chunkedArr = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArr.push(array.slice(i, i + size));
        }
        return chunkedArr;
    }

    let isOn = false;

    let isDragging = false;

    function createCard(name, specialization, photoSrc, audioSrc, price, description) {
        const cardWrapper = document.createElement('div');
        cardWrapper.className = 'card-wrapper';

        const card = document.createElement('div');
        card.className = 'card';

        card.addEventListener('mouseover', function() {
            this.classList.add('expanded');
        });

        card.addEventListener('mouseout', function() {
            this.classList.remove('expanded');
        });
            
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const cardIcon = document.createElement('div');
        cardIcon.className = 'card-icon';
        const iconImg = document.createElement('img');
        iconImg.src = photoSrc;
        iconImg.alt = '';
        iconImg.width = 50;
        iconImg.height = 50;
        cardIcon.appendChild(iconImg);

        const cardAuthorInfo = document.createElement('div');
        cardAuthorInfo.className = 'card-author-info';

        const cardName = document.createElement('div');
        cardName.className = 'card-name';
        cardName.textContent = name;
        const cardSpec = document.createElement('div');
        cardSpec.className = 'card-spec';
        cardSpec.textContent = specialization;

        cardAuthorInfo.appendChild(cardName);
        cardAuthorInfo.appendChild(cardSpec);

        cardBody.appendChild(cardIcon);
        cardBody.appendChild(cardAuthorInfo);

        const cardFooter = document.createElement('div');
        cardFooter.className = 'card-footer';

        const cardPlayer = document.createElement('div');
        cardPlayer.className = 'card-player';

        const player = document.createElement('div');
        player.className = 'player';

        const controls = document.createElement('div');
        controls.className = 'controls';

        const playBtn = document.createElement('button');
        playBtn.className = 'play-btn';
        const playImg = document.createElement('img');
        playImg.src = './images/play-btn.png';
        playImg.alt = '';
        playImg.width = 15;
        playImg.height = 15;

        playBtn.appendChild(playImg);

        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'download-btn';
        const downloadLink = document.createElement('a');
        downloadLink.id = 'downloadLink';
        downloadLink.href = audioSrc;
        downloadLink.download = 'audio.mp3';
        const downloadImg = document.createElement('img');
        downloadImg.src = './images/download-btn.png';
        downloadImg.alt = '';
        downloadImg.width = 15;
        downloadImg.height = 15;
        downloadLink.appendChild(downloadImg);
        downloadBtn.appendChild(downloadLink);

        controls.appendChild(playBtn);
        controls.appendChild(downloadBtn);

        const audioPlayer = document.createElement('audio');
        audioPlayer.className = 'audio-player';
        audioPlayer.preload = 'auto';

        const audioSource = document.createElement('source');
        audioSource.src = audioSrc;
        audioSource.type = 'audio/mpeg';
        audioPlayer.appendChild(audioSource);

        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';

        const progress = document.createElement('div');
        progress.className = 'progress';
        const timePopup = document.createElement('div');
        timePopup.className = 'time-popup';
        const timerCurrent = document.createElement('div');
        timerCurrent.className = 'timer-current';
        timerCurrent.textContent = '0:00';
        const timerLength = document.createElement('div');
        timerLength.className = 'timer-length';
        timerLength.textContent = '0:00';

        playBtn.addEventListener('click', () => {
            if (!checkAudioPlaying()) {
                isOn = true;
                audioPlayer.play();
                playImg.src = './images/pause-btn.png';
                console.log('play')
            } else {
                stopAudio();
                isOn = false;
                audioPlayer.pause();
                playImg.src = './images/play-btn.png';
                console.log('stop');
            }
        });


        audioPlayer.addEventListener('timeupdate', () => {
            const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progress.style.width = `${progressPercent}%`;
            timerCurrent.textContent = formatTime(audioPlayer.currentTime);
            timerLength.textContent = formatTime(audioPlayer.duration);
        });

        progressContainer.appendChild(progress);
        progressContainer.appendChild(timePopup);
        progressContainer.appendChild(timerCurrent);
        progressContainer.appendChild(timerLength);

        let popupTimeout;
        progressContainer.addEventListener('mousemove', (e) => {
            clearTimeout(popupTimeout);
            const width = progressContainer.clientWidth;
            const offsetX = e.offsetX;
            const duration = audioPlayer.duration;
            const time = (offsetX / width) * duration;
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
    
            timePopup.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            timePopup.style.left = `${offsetX}px`;
            timePopup.style.display = 'block';
    
            popupTimeout = setTimeout(() => {
                timePopup.style.display = 'none';
            }, 1000);
        });

        progressContainer.addEventListener('mousedown', (e) => {
            const width = progressContainer.clientWidth;
            const clickX = e.offsetX;
            const duration = audioPlayer.duration;
            audioPlayer.currentTime = (clickX / width) * duration;
        });

        progressContainer.addEventListener('mouseleave', () => {
            timePopup.style.display = 'none';
        }); 

        player.appendChild(controls);
        player.appendChild(audioPlayer);
        player.appendChild(progressContainer);

        cardPlayer.appendChild(player);

        const expandedCard = document.createElement('div');
        expandedCard.className = 'expanded-card';

        const expandedCardPrice = document.createElement('p');
        expandedCardPrice.className = 'expanded-card-price';
        expandedCardPrice.textContent = price + ' рублей';
        const expandedCardBtn = document.createElement('button');
        expandedCardBtn.className = 'expanded-btn';
        expandedCardBtn.textContent = 'Заказать';

        const expandedCardSpec = document.createElement('p');
        expandedCardSpec.className = 'expanded-card-spec';
        expandedCardSpec.textContent = description;

        expandedCard.appendChild(expandedCardPrice);
        expandedCard.appendChild(expandedCardBtn);
        expandedCard.appendChild(expandedCardSpec);

        cardFooter.appendChild(cardPlayer);
        cardFooter.appendChild(expandedCard);

        card.appendChild(cardBody);
        card.appendChild(cardFooter);

        cardWrapper.appendChild(card);

        cardBlockInner.appendChild(cardWrapper);
    }

    function checkAudioPlaying() {
        audioArr = document.querySelectorAll('.audio-player');
        for (let i = 0; i <= audioArr.length; i++) {
            if (!audioArr[i].paused) {
                return true;
            } else if (audioArr[i].paused && (i + 1 === audioArr.length)) {
                return false;
            }
            console.log(i);
        }

    }

    function stopAudio() {
        playPauseBtnImgArr = document.querySelectorAll('.play-btn img');
        console.log('stop');
        audioArr.forEach((audio, index) => {
            audio.pause();
            playPauseBtnImgArr[index].src = './images/play-btn.png';
        })       
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
});
