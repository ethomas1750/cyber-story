const topstories = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty/v0/topstories"

function fetchData(response){
    let apiClips = `https://hacker-news.firebaseio.com/v0/item/${response}.json?print=pretty`
    return fetch(apiClips)
}

fetch(topStories)
    .then((response)=>{
        return response.json()
    })
    .then((array)=>{
        array.length = 100
        let newArray = []
        for(let item of array){
            newArray.push(fetchData(item))
        }
        // console.log(newArray)
        Promise.all(newArray)
        .then((results) => Promise.all(results.map(res => res.json())))
        .then((data)=>{
            // console.log(data)
            for (let item of data){
                let clips = document.createElement('li')
                clips.innerHTML = `<a href=${item.url}>${item.title}</a></br>By: ${item.by}, Score: ${item.score}, Comments: ${item.descendants}`
                headlines.appendChild(clips)
                console.log('hello')
            }
        })
    })
