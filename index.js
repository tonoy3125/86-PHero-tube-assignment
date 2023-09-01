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
        categoriesContainer.appendChild(li)
    });



}

const handleLoadCategories = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await response.json()
    const getData = data.data;
    const cardContainer = document.getElementById('card-container');

    const sortByView = document.getElementById('sort-by-view');
    const sortedData = () => {
        const sortedData = getData.sort((a, b) => {
            a = a?.others?.views;
            a = parseFloat(a.replace("K", ""));

            b = b?.others?.views;
            b = parseFloat(b.replace("K", ""));
            return b - a;

        })
        categoryCard(sortedData);
    }
    sortByView.addEventListener('click', sortedData);


    const categoryCard = (withOutSortData) => {
        cardContainer.innerHTML = ""

        // Error page Handle
        const errorContent = document.getElementById('errorContent');
        if (withOutSortData.length === 0) {
            errorContent.innerHTML = `
       <div class="flex justify-center items-center ">
       <div class="w-3/4 mx-auto text-center">
           <div class="mb-6 w-44 mx-auto">
           <img class="w-full" src="/icons/icon.png" alt="Shoes" />
           </div>
           <div>
           <h2 class="font-bold text-5xl">Oops!! Sorry, There is no content here</h2>
           </div>
       </div>
       </div>

       `;
        } else {
            errorContent.innerHTML = ""
        }

        withOutSortData.forEach(data => {
            const div = document.createElement('div');
            div.innerHTML = `
        <div id="card" class="card card-compact">
            <figure class="w-full h-[200px]">
                <img class="w-full h-full rounded-lg" src="${data.thumbnail}" alt="Shoes" />
            </figure>
            <div class="card-body">
                <div class="flex gap-4 items-center">
                    <div class="avatar">
                        <div class="w-10 rounded-full">
                            <img src="${data?.authors[0]?.profile_picture}" />
                        </div>
                    </div>
                    <div>
                        <h2 class="text-[#171717] font-bold text-lg"> ${data?.title} </h2>
                    </div>
                </div>
                <div class="flex gap-3 ml-14">
                    <div class="text-sm font-normal text-[#252525B2]">${data?.authors[0]?.profile_name}</div>
                    <div class="font-sm font-normal">
                        <img class="w-5 h-5"  src="${data?.authors[0]?.verified === true ? '/icons/verified.png' : ' '}">
                    </div>
                </div>
                <p class="text-sm font-normal text-[#252525B2] ml-14">${data?.others?.views} Views</p>
            </div>
        </div>
        `;
        cardContainer.appendChild(div);
        })

    }
    categoryCard(getData);

}




getCategories()

handleLoadCategories('1000')