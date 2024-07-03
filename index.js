// Array de produtos
const productosArray = [
    {
      id: 1,
      nombre: 'Corte Masculino',
      descripcion: 'Corte de cabelo masculino clássico.',
      precio: 10.00,
      img: 'https://cdn-icons-png.flaticon.com/512/2771/2771403.png',
    },
    {
      id: 2,
      nombre: 'Corte Feminino',
      descripcion: 'Corte de cabelo feminino elegante.',
      precio: 50.00,
      img: 'https://cdn-icons-png.flaticon.com/512/2771/2771403.png',
    },
    {
      id: 3,
      nombre: 'Corte Infantil',
      descripcion: 'Corte de cabelo para crianças.',
      precio: 50.00,
      img: 'https://cdn-icons-png.flaticon.com/512/2771/2771403.png',
    },
    {
      id: 4,
      nombre: 'Corte degrade',
      descripcion: 'Corte de cabelo com degradê.',
      precio: 65.00,
      img: 'https://cdn-icons-png.flaticon.com/512/2771/2771403.png',
    },
    {
        id: 5,
        nombre: 'Corte Combo',
        descripcion: 'Cabelo, sobrancelha, barba e alisamento',
        precio: 65.00,
        img: 'https://cdn-icons-png.flaticon.com/512/2771/2771403.png',
      },
      {
        id: 6,
        nombre: 'Corte Combo  + Alisamento',
        descripcion: 'Cabelo, sobrancelha, barba e alisamento',
        precio: 65.00,
        img: 'https://cdn-icons-png.flaticon.com/512/2771/2771403.png',
      },
      {
        id: 7,
        nombre: 'Corte Combo2',
        descripcion: 'Cabelo, sobrancelha, barba e alisamento',
        precio: 65.00,
        img: 'https://cdn-icons-png.flaticon.com/512/2771/2771403.png',
      },
      
  ];
  
  const contenedorProductos = document.querySelector('.contenedor-productos');
  const templateProd = document.getElementById('template-prod').content;
  const fragmento = document.createDocumentFragment();
  const tabla = document.querySelector('.tabla');
  const tbody = document.getElementById('carrito-body');
  const tfooter = document.getElementById('tfooter').content;
  const templateProductoCarrito = document.getElementById('agregar-producto-al-carro').content;
  const footer = document.getElementById('footer');
  const productosCarrito = [];
  
  // Función para cargar los productos en la interfaz
  productosArray.forEach(producto => {
    templateProd.querySelector('.nombre-prod').textContent = producto.nombre;
    templateProd.querySelector('.descripcion-prod').textContent = producto.descripcion;
    templateProd.querySelector('.precio').textContent = producto.precio.toFixed(2);
    templateProd.querySelector('img').setAttribute('src', producto.img);
    templateProd.querySelector('img').setAttribute('alt', producto.nombre);
    templateProd.querySelector('.boton').dataset.id = producto.id;
  
    const clon = templateProd.cloneNode(true);
    fragmento.appendChild(clon);
  });
  
  contenedorProductos.appendChild(fragmento);
  
  // Función para agregar producto al carrito
  const agregarProductoCarrito = (id) => {
    const producto = productosArray.find(item => item.id === id);
    const index = productosCarrito.findIndex(item => item.id === id);
  
    if (index === -1) {
      producto.cantidad = 1;
      productosCarrito.push(producto);
    } else {
      productosCarrito[index].cantidad++;
    }
  
    actualizarCarrito();
  };
  
  // Función para actualizar el carrito
  const actualizarCarrito = () => {
    tbody.innerHTML = '';
  
    productosCarrito.forEach(producto => {
      const clon = templateProductoCarrito.cloneNode(true);
      clon.querySelector('#producto').textContent = producto.nombre;
      clon.querySelector('#cant').textContent = producto.cantidad;
      clon.querySelector('#precio-uni').textContent = producto.precio.toFixed(2);
      clon.querySelector('#precio-total-prod').textContent = (producto.precio * producto.cantidad).toFixed(2);
      clon.querySelector('#menos-cantidad').dataset.id = producto.id;
      clon.querySelector('#mas-cantidad').dataset.id = producto.id;
  
      tbody.appendChild(clon);
    });
  
    footer.innerHTML = '';
    if (productosCarrito.length > 0) {
      const clonFooter = tfooter.cloneNode(true);
      clonFooter.querySelector('#total-a-pagar').textContent = productosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0).toFixed(2);
      footer.appendChild(clonFooter);
    } else {
      const tr = document.createElement('tr');
      tr.innerHTML = '<td class="border-bottom-left border-bottom-right" colspan="4">Não há nenhum elemento no carrinho!</td>';
      footer.appendChild(tr);
    }
  };
  
  // Evento para agregar productos al carrito
  contenedorProductos.addEventListener('click', (e) => {
    if (e.target.classList.contains('boton')) {
      const id = parseInt(e.target.dataset.id);
      agregarProductoCarrito(id);
    }
  });
  
  // Eventos para aumentar o disminuir la cantidad de productos en el carrito
  tbody.addEventListener('click', (e) => {
    const id = parseInt(e.target.dataset.id);
    const index = productosCarrito.findIndex(item => item.id === id);
  
    if (e.target.id === 'mas-cantidad') {
      productosCarrito[index].cantidad++;
    }
  
    if (e.target.id === 'menos-cantidad') {
      productosCarrito[index].cantidad--;
      if (productosCarrito[index].cantidad === 0) {
        productosCarrito.splice(index, 1);
      }
    }
  
    actualizarCarrito();
  });
  
  // Evento para vaciar el carrito
  footer.addEventListener('click', (e) => {
    if (e.target.id === 'vaciar-tabla') {
      productosCarrito.length = 0;
      actualizarCarrito();
    }
  });
  
  // Dados dos funcionários
 // const funcionarios = [
    //{
     // nome: 'João',
      //horarios: ['08:00-16:00', '08:00-16:00', '08:00-16:00', '08:00-16:00', '08:00-16:00', '08:00-12:00', 'Folga']
   // },
    //{
     // nome: 'Bruno',
      //horarios: ['09:00-17:00', '09:00-17:00', '09:00-17:00', '09:00-17:00', '09:00-17:00', '09:00-13:00', 'Folga']
    //},
    //{
     // nome: 'Moises',
     // horarios: ['10:00-18:00', '10:00-18:00', '10:00-18:00', '10:00-18:00', '10:00-18:00', '10:00-14:00', 'Folga']
    //},
    //{
     // nome: 'Corno',
      //horarios: ['08:00-16:00', '08:00-16:00', '08:00-16:00', '08:00-16:00', '08:00-16:00', '08:00-12:00', 'Folga']
    //}
  //];
  
  // Função para renderizar a tabela de horários
  const renderizarHorarios = () => {
    const tbodyHorarios = document.getElementById('horarios-body');
    tbodyHorarios.innerHTML = ''; // Limpar tabela
  
    funcionarios.forEach(funcionario => {
      const tr = document.createElement('tr');
  
      const tdNome = document.createElement('td');
      tdNome.textContent = funcionario.nome;
      tr.appendChild(tdNome);
  
      funcionario.horarios.forEach(horario => {
        const tdHorario = document.createElement('td');
        tdHorario.textContent = horario;
        tr.appendChild(tdHorario);
      });
  
      tbodyHorarios.appendChild(tr);
    });
  };
  
  // Chamar a função para renderizar a tabela ao carregar a página
  document.addEventListener('DOMContentLoaded', renderizarHorarios);
  
  const registrarCorte = (nomeFuncionario) => {
    const funcionario = funcionarios.find(f => f.nome === nomeFuncionario);
    if (funcionario) {
      if (!funcionario.cortes) {
        funcionario.cortes = 0;
      }
      funcionario.cortes++;
      atualizarExibicaoCortes();
    }
  };
  
  // Função para atualizar a exibição dos cortes
  const atualizarExibicaoCortes = () => {
    const listaCortes = document.getElementById('lista-cortes');
    listaCortes.innerHTML = ''; // Limpar a lista
  
    funcionarios.forEach(funcionario => {
      const item = document.createElement('li');
      item.textContent = `${funcionario.nome}: ${funcionario.cortes} cortes`;
      listaCortes.appendChild(item);
    });
  };
  
  // Chamar a função para atualizar a exibição dos cortes ao carregar a página
  document.addEventListener('DOMContentLoaded', atualizarExibicaoCortes);
  
  
  