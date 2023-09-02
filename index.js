
// Get Categories function
const getCategories = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await response.json()
    const categoriesContainer = document.getElementById('categories-container');
    const categories = data.data

    categories.forEach(category => {
        const li = document.createElement('li');
        li.innerHTML = `
        <button onclick ="handleLoadCategories('${category.category_id}')" class=" rounded-[4px] text-base hover:bg-red-600 hover:text-white pt-[5px] pb-[5px] pl-5 pr-5 text-[#252525B2] bg-[#25252526]">${category.category}</button>
        `;
        categoriesContainer.appendChild(li);
    });
}

// Get Categories id

const handleLoadCategories = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await response.json()
    const getData = data.data;
    const cardContainer = document.getElementById('card-container');

    // Sort By views

    const sortByView = document.getElementById('sort-by-view');
    const sortedByData = () => {
        const sortedData = getData.sort((a, b) => {
            a = a?.others?.views;
            a = parseFloat(a.replace("K", ""));

            b = b?.others?.views;
            b = parseFloat(b.replace("K", ""));
            return b - a;
        })
        categoryCard(sortedData);
    }
    sortByView.addEventListener('click', sortedByData);

    // Show Error content

    const categoryCard = (withOutSortData) => {
        cardContainer.textContent = ""

        const errorContent = document.getElementById('error-content');
        if (withOutSortData.length === 0) {
            errorContent.innerHTML = `
       <div class="flex justify-center items-center ">
            <div class="w-3/4 mx-auto text-center">
                <div class=" mt-10 lg:mt-28 mb-6 w-44 mx-auto">
                    <img src="/icons/icon.png" alt="" />
                </div>
                <div>
                    <h2 class="font-bold text-3xl text-[#171717]">Oops!! Sorry, There is no content here</h2>
                </div>
            </div>
       </div>

       `;
        } else {
            errorContent.innerHTML = ""
        }

        withOutSortData.forEach(data => {

            // show time

            const totalSecond = data.others.posted_date
            const previousMinutes = totalSecond % 60;
            const minutesTotal = (totalSecond - previousMinutes) / 60;
            const previousHours = minutesTotal % 60;
            const hoursTotal = (minutesTotal - previousHours) / 60


            let time ;
            if(totalSecond.length === 0){
                time;
            }
            else{
                time = `${hoursTotal} Hours ${previousHours} Minutes ago`;
            }
// Show Card...........
            const div = document.createElement('div');
            div.innerHTML = `
        <div id="card" class="card card-compact">
            <div class="relative">
                <figure class=" w-[312px] mx-auto lg:w-full h-[200px]">
                    <img class="w-full h-full rounded-lg" src="${data.thumbnail}" alt="Shoes" />
                </figure>
                <div class="badge ${time==undefined ? "bg-transparent border-none " : "text-white"} bg-black absolute bottom-3 right-16 lg:right-2">${time?time : ''}</div>
            </div>
            <div class="card-body">
                <div class="flex gap-4 items-center ml-12 lg:ml-0 ">
                    <div class="avatar">
                        <div class="w-10 rounded-full">
                            <img src="${data?.authors[0]?.profile_picture}" />
                        </div>
                    </div>
                    <div>
                        <h2 class="text-[#171717] font-bold text-lg"> ${data?.title} </h2>
                    </div>
                </div>
                <div class="flex gap-3 ml-[105px] lg:ml-14">
                    <div class="text-sm font-normal text-[#252525B2]">${data?.authors[0]?.profile_name}</div>
                    <span class="w-5 h-5">${data?.authors[0]?.verified? ('<img src="./icons/verified.png">') : ''}</span>
                </div>
                <p class="text-sm font-normal text-[#252525B2] ml-[105px] lg:ml-14">${data?.others?.views} Views</p>
            </div>
        </div>
        `;
        cardContainer.appendChild(div);
        })

    }
    categoryCard(getData);

}



// Blog Button Clicked Function

const blogButton = document.getElementById('blog-btn').addEventListener('click', function(){
    window.location.href = 'blog.html';
})

// Function Called
getCategories()

handleLoadCategories('1000')