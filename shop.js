if(document.readyState == "loading"){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}

function ready(){
    const addToCartBtns = document.querySelectorAll('.underItem>button');
    addToCartBtns.forEach(btn => btn.addEventListener('click', addToCart));

    const delFromCartBtns = document.querySelectorAll('.cart>ul>li>button.delBtn');
    delFromCartBtns.forEach(btn => btn.addEventListener('click', delFromCart));
    
    const accIcon = document.getElementsByClassName('accIcon')[0];
    accIcon.addEventListener('click', toggleOptions);
    
    document.querySelector('.accOptions>button').addEventListener('click', logOut);

    document.querySelector('.summary>button').addEventListener('click', buy)
    document.querySelectorAll('.cart>ul>li>button:nth-of-type(2)').forEach(elem => elem.addEventListener('click', buyOne))
}

function toggleOptions(){
    document.getElementsByClassName('accOptions')[0].classList.toggle('handleOptions');
}

function logOut(){
    // window.location.replace("http://localhost/logowanie_Tomasz_Wardeński4kg25/konto.php");
    alert("Logged Out");
}

function buy(){
    document.querySelectorAll('.cart>ul>li').forEach(liElem => liElem.remove())
    updateValue();
    alert("Dokonano zakupu")
}

function buyOne(e){
    e.target.parentElement.remove();
    updateValue();
    alert("Dokonano zakupu")
}

function delFromCart(e){
    const btn = e.target;
    btn.parentElement.remove();
    updateValue();
    ready()
}

function addToCart(e){
    const btn = e.target;
    const product = btn.parentElement.parentElement;
    
    const selectedItemCode = product.getAttribute("class");
    let flag = true

    document.querySelectorAll('.cart>ul img').forEach(item => {
        let itemClass = item.getAttribute('data-product');
        if(selectedItemCode == itemClass){
            flag = false;
        }
    })

    if(flag){
        const imgSrc = product.querySelector(".image>img").getAttribute("src");
        const price = product.querySelector("div.underItem>p").innerHTML;

        const cartImage = document.createElement('img');
        cartImage.setAttribute('src', imgSrc)
        cartImage.setAttribute('title', btn.parentElement.previousElementSibling.firstElementChild.textContent)

        const productCode = product.getAttribute("class");
        cartImage.setAttribute('data-product', productCode)

        const cartP = document.createElement('p');
        cartP.innerHTML = price;
        
        const delBtn = document.createElement('button');
        delBtn.setAttribute('class', 'delBtn');
        delBtn.innerHTML = "Usuń";

        const buyBtn = document.createElement('button');
        buyBtn.setAttribute('class', 'buyBtn');
        buyBtn.innerHTML = "Kup";

        const cartLi = document.createElement('li');

        cartLi.appendChild(cartImage);
        cartLi.appendChild(cartP);
        cartLi.appendChild(delBtn);
        cartLi.appendChild(buyBtn);
        
        document.querySelector('div.cart>ul').appendChild(cartLi);  

        updateValue();
        alert("Dodano zegarek do kosza.");
        ready()
    }else{
        alert("Produkt już jest w koszyku.")
    }
}


const updateValue = () => {
    const valueSpan = document.querySelector('.summary>p>span');
        valueSpan.innerHTML = "0";
        document.querySelectorAll('.cart>ul>li>p').forEach(p => {
            let itemPrice = p.innerHTML;
            let newValue = parseInt(valueSpan.innerHTML);
            newValue += parseInt(itemPrice.replace("zł", ""));
            document.querySelector('.summary>p>span').innerHTML = newValue;
        })
}
