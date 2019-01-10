# vuejs
experimental.
Se inicia un proyecto con Vue.js v2.0.3 y Materialize v1.0.2


# la idea es encapsular los componentes de Materialize, en componentes vuejs,
# al registrar los componentes en la instancia de vuejs, son accesibles en todas partes, de ser asi se deberia pode acceder a los distintos componentes de vuejs dentro del parametro template de la configuracion del componente, alli dentro para crear el componente hijo este debe llamar al componente por medio de los tag, y este tag se debe llamar tal cual se registro en la instancia de vuejs, al crear este tag con el nombre del componente dentro del parametro template de otro componente se pueden crear hijos. el inconveniente que veo es que los componentes de componen dentro de sus parametrizaciones, que si manipulamos la instancia del componente dentro de la instancia de vue es mas optimo el mantenimiento, creo que se podria llegar a eso, hay que investigar un poco mas (manipular en la instancia los componentes registrados en  la instancia de vuejs como crear una instancia de un objeto dentro de otra y pasarle la instancia, de esta manera se lograria un mejor control de los componentes)
