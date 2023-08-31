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
    const getdata = data.data;

    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';
    getdata.forEach(data => {
        console.log(data)
        const div = document.createElement('div');
        div.innerHTML = `
        <div>
            <div class="card image-full w-[312px] h-[200px] mx-auto">
            <figure><img src="${data?.thumbnail}" alt="Shoes" /></figure>
            </div>
            <div class="flex gap-3 ml-8 mt-5">
                <div>
                    <div class="avatar">
                        <div class="rounded-full w-[40px] h-[40px]">
                        <img src="${data?.authors[0].profile_picture}" />
                        </div>
                    </div>
                </div>
                <div>
                <h2 class="text-[#171717]">${data?.title}</h2>
                <p>${data?.authors[0].profile_name}</p>
                <p>${data?.others?.views}</p>
                </div>
        </div>
    </div>
        `;
        cardContainer.appendChild(div)
    });
}




getCategories()

handleLoadCategories('1000')