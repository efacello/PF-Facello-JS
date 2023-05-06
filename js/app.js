const registro_button = document.querySelector(".button");
registro_button.onclick = (e) => {
	e.preventDefault();

	//datos que se van a recibir
	const nombre = document.getElementById("nombre").value;
	const email = document.getElementById("email").value;
	const contraseña = document.getElementById("contraseña").value;
	const ccontraseña = document.getElementById("ccontraseña").value;

	//como se van a guardar en la web
	localStorage.setItem('Nombre', nombre);
	localStorage.setItem('Correo', email);
	localStorage.setItem('Password', contraseña);
	localStorage.setItem('Cpass', ccontraseña);

	//condicionales
	if(nombre == "" && email == "" && contraseña == "" && ccontraseña == ""){
		swal("Advertencia!", "Debes completar todos los campos!", "error");
	}
	else
	{
		if(contraseña !== ccontraseña){
			swal("Advertencia!", "Las contraseñas no coinciden!", "error");
		}else{
			swal("Usted está registrado!", "juguemos!", "success");
		}
	}
}

//acceso una vez registrado
const login = document.querySelector('.login');
login.onclick = (e) => {
	e.preventDefault();
	
	//traer valores desde la pagina de inicio de sesion
	const DireccionEmail = document.getElementById("Email").value;
	const passWord = document.getElementById("Contraseña").value;

	//obtener valores en localstorage desde el form de registro
	const Email = localStorage.getItem("Correo");
	const Password = localStorage.getItem("Password");

	if(DireccionEmail == "" && passWord == ""){
		swal("Advertencia!", "No completaste ningún campo", "error");
	}else{
		if(DireccionEmail == Email && passWord == Password){
			window.location.replace("./game.html"); // redirige al usuario a la página de juego
		}else{
			swal("Advertencia!", "Controla bien tus datos", "error");
		}
	}
}

