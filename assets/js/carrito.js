
// crear clase carrito

class Carrito {
    constructor() {
        this.productos = {}; 
        this.currency  = "$"; 
    }

    actualizarUnidades(title, unidades, precio) {
        if (this.productos[title]) {
            this.productos[title].quantity += unidades; 
        } else if (unidades > 0) {
            this.productos[title] = {
                quantity: unidades,
                price   : precio 
            };
        }
    
        if (this.productos[title].quantity <= 0) {
            delete this.productos[title];
        }
    }

    

    obtenerCarrito() {
        let total = 0;
        for (let title in this.productos) {
            const { price, quantity } = this.productos[title];
            total += price * quantity; 
        }
        return {
            total: total.toFixed(2),
            currency: this.currency,
            products: this.productos
        };
    }

    vaciarCarrito() {
        this.productos = {}; 
    }
}






