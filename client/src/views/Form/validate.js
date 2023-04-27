const validate =(form)=>{
        //validamos fecha 
        const dateValidate = /^\d{4}-\d{2}-\d{2}$/;
        //validamos url image
        const urlValidate = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
        //espacios de caracteres
        const specialChar = /[!@#$%^&*()?":{}|<>]/;
        // validamos espacios 
        const spacesValidate = /^\S.*\S$/;
    
        const errors = {};
        //Validamos nombre 
        if (!form.name) {
            errors.name = 'El Nombre se encuentra vacio.';
        } else {
            if (form.name.length < 1 || form.name.length > 50) {
                errors.name = 'The name must be longer than 1 character and shorter than 50 characters.';
            } else if (specialChar.test(form.name)) {
                errors.name = 'El nombre pude contener caracteres especiales.';
            } else if (!spacesValidate.test(form.name)) {
                errors.name = 'El nombre no pude tener espacios el comienzo ni al final.';
            }
        }
        //validamos imagen
        if (!form.image) {
            errors.image = 'Imagen no debe estar vacio';
        } else {
            const isValid = urlValidate.test(form.image);
            if (!isValid) {
                errors.image = 'Por favor ingrese una url valida para imagen';
            }
        }
        //validamos fecha
        if (!form.released) {
            errors.released = 'The date of publication cannot be empty.';
        } else {
            if (!dateValidate.test(form.released)) {
                errors.released = 'Invalid date format.';
            } else {
                const partes = form.released.split('-');
                const anio = parseInt(partes[0]);   
                const mes = parseInt(partes[1]) - 1;
                const dia = parseInt(partes[2]);
                const fecha = new Date(anio, mes, dia);
                //Validamos si son correctos
                if (fecha.getMonth() !== mes || fecha.getDate() !== dia) {
                    errors.released = 'Fecha invalida.'
                }
            }
        }
        //validamos rating
        if (!form.rating) {
            errors.rating = 'El rating no puede estar vacío.'
        } else if (!Number.isInteger(Number(form.rating))) {
            errors.rating = 'El rating debe ser un número entero.';
        } else if (Number(form.rating) < 1) {
            errors.rating = 'La puntuación no puede ser menor que 1';
        } else if (Number(form.rating) > 5) {
            errors.rating = 'La puntuación no puede ser mayor que 5';
        }
        if (!form.genres.length || form.genres.length===0) {
            errors.genres = 'Generos no puede estar vacío.'
        }
        if (!form.plataforms.length || form.plataforms.length===0) {
            errors.plataforms = 'Plataforma no puede estar vacío.'
        }
    
        //validamos descripcion
        if (!form.description) {
            errors.description = 'El campo descripción no puede estar vacío.';
        } else {
            if (form.description.length < 5) {
                errors.description = 'The description cannot be too short.';
            } else if (specialChar.test(form.description)) {
                errors.description = 'The description cannot contain special characters.';
            } else if (!spacesValidate.test(form.description)) {
                errors.description = 'The description cannot have gaps at the beginning or at the end.';
            }
        }
      
    
        return errors;
}
export default validate;