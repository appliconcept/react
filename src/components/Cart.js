import React, {Component} from "react";
import Storage from "../tools/Storage";
import { Product } from "../tools/Database";

class Cart{
    cart = {
        products: [],
        quantities: 0,
        discount: 0,
        excludedTaxPrice: 0,
        vat: 0,
        includedTaxPrice: 0
    };

    constructor(){
        //get cart from storage
        this.getFromStorage(); 
    }

    getFromStorage = ()=>{
        Storage.get("cart").then((data)=>{
            if(data != ""){
                this.cart = data;
            }
        });
    }

    setInStorage = ()=>{
        Storage.set("cart", this.cart);
    }

    round = (roundedValue)=>{
         return Math.round(roundedValue*100)/100;
    }

    fixePrices = (includedTaxPrice, excludedTaxPrice, vat)=>{
        let difference = 0;
        let httva = 0;
        httva = excludedTaxPrice + vat;
        if(excludedTaxPrice + vat > includedTaxPrice || excludedTaxPrice + vat < includedTaxPrice){
            difference = this.toNumber(this.toNumber(includedTaxPrice) - httva);
            return difference;
        }
        return 0;    
    }

    toNumber = (number)=>{
        return number * 1;
    }

    update = ()=>{
        let quantities = 0;
        let excludedTaxPrice = 0;
        let includedTaxPrice = 0;
        let vat = 0;
        let difference = 0;

        if(this.cart.products !== []){
            let difference = 0
            this.cart.products.map((product)=>{
                quantities += product.quantity;
                if(quantities > 1){
                    excludedTaxPrice += this.toNumber(product.discountedExcludedTaxPrice) * quantities;
                    includedTaxPrice += this.toNumber(product.discountedIncludedTaxPrice) * quantities;
                    vat += (this.toNumber(product.discountedIncludedTaxPrice) - this.toNumber(product.discountedExcludedTaxPrice)) * quantities;
                }else{
                    excludedTaxPrice += this.toNumber(product.discountedExcludedTaxPrice);
                    includedTaxPrice += this.toNumber(product.discountedIncludedTaxPrice);
                    vat += this.toNumber(product.discountedIncludedTaxPrice) - this.toNumber(product.discountedExcludedTaxPrice);
                }
            });

            excludedTaxPrice = this.round(excludedTaxPrice);
            includedTaxPrice = this.round(includedTaxPrice);
            vat = this.round(vat);

            difference = this.fixePrices(includedTaxPrice, excludedTaxPrice, vat).toFixed(2);
            //excludedTaxPrice = parseFloat(excludedTaxPrice) + parseFloat(difference) ;

            this.cart.excludedTaxPrice = this.toNumber(excludedTaxPrice.toFixed(2));
            this.cart.includedTaxPrice = this.toNumber(includedTaxPrice);
            this.cart.vat = this.toNumber(vat);
            this.cart.quantities = this.toNumber(quantities);
        }

        this.setInStorage();
        return Promise.resolve(this.cart);
    }

    clear = ()=>{
        this.cart.products = [];
        return this.update();
    }

    delete = (productId)=>{
        this.cart.products = this.cart.products.filter(product => product.id !== productId);
        return this.update();
    }

    subtract = (productId, qty=1)=>{
        if( this.cart.products.find( product => product.id == productId ) ){
            this.cart.products = this.cart.products.map((product)=>{
                if(product.id == productId){
                    product.quantity = product.quantity - qty;
                }
                return product;
            });
            this.cart.products = this.cart.products.filter(product => product.quantity > 0);         
        }
        return this.update();
    }

    //add product to cart or increment quantity
    add = (productId, qty=1)=>{
        if( this.cart.products.find( product => product.id == productId ) ){
            this.cart.products = this.cart.products.map((product)=>{
                if(product.id == productId){
                    product.quantity = product.quantity + qty;
                }
                return product;
            })
            return this.update();
        }else{
            return Product.infos(productId).then((data)=>{
                let product = data.response.metas;
                product.id = data.response.id;
                product.quantity = qty;
                this.cart.products.push(product);
                return this.update();
            });
        }
    }
}
export default new Cart(); 