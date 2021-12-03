const pessoas = [];

const usuarios = [
  {
    id: 1,
    name: "João",
    matricula: "20210101",
    horas: 10,
    error: true,
    status: true,
  },

  {
    id: 2,
    status: true,
    name: "Maria",
    matricula: "20210102",
    horas: 20
  },
  {
    id: 3,
    name: "Pedro",
    matricula: "20210103",
    horas: 25
  },
  {
    id: 4,
    name: "Mauricio",
    matricula: "20210104",
    horas: 35
  },
  {
    id: 5,
    name: "Alex",
    matricula: "20210105",
    horas: 60
  },
  {
    id: 6,
    name: "Bruno",
    matricula: "20210106",
    error: true,
    horas: 5
  },
  {
    id: 7,
    name: "Alba",
    matricula: "20210107",
    horas: 35
  },
  {
    id: 8,
    name: "Mara",
    matricula: "20210108",
    horas:40
  },
  {
    id: 9,
    name: "Guilherme",
    matricula: "20210109",
    horas:50
  },
  {
    id: 10,
    name: "William",
    matricula: "20210110",
    horas: 45
  },
];



function list() {
  let tbody = document.querySelector("tbody");
  tbody.innerText = "";

  usuarios.forEach((usuarios, index) => {
    let tr = tbody.insertRow();
    let td_id = tr.insertCell();
    let td_name = tr.insertCell();
    let td_matricula = tr.insertCell();
    let td_horas = tr.insertCell();
    let td_link = tr.insertCell();
    let td_button = tr.insertCell();

    td_id.innerText = usuarios.id;
    td_name.innerText = usuarios.name;
    td_horas.innerText = usuarios.horas;
    console.log(usuarios.horas);
    td_matricula.innerText = usuarios.matricula;
    td_link.innerHTML = `<a  ${
      usuarios.horas < 11 ? "style='color: #ccc;'" : "href='_' download"
    } >Certificado</a>`;
    td_button.innerHTML = `<button onclick="changeStatus(${index})" class="btn btn-primary my-button"  id="btns" >${
      usuarios.status ? "Homologado" : "Homologar"
    }</button>`;

  });
}

function changeStatus(posicao) {
  if (usuarios[posicao].error) {
    return toastr.error("Não foi possível homologar!");
  } else {
    usuarios[posicao].status = !usuarios[posicao].status;
    toastr.success("Homologado com sucesso!");
  }

  return list();
}

list();

new gridjs.Grid({
  columns: ["Nome", "Email", {
    name: "Arquivo",
    formatter: (cell) => gridjs.html(`<a href=':${cell}'>Certificado</a>`)
    
  }],
  data: [
    ["João", "joao@gmail.com",],
    ["Maria", "maria@gmail.com", ],
    ["Pedro", "Pedro@gmail.com", ],
    ["Mauricio", "Mauricio@gmail.com",],
    ["Alex", "alex@mail.com", ],
    ["Bruno", "bruno@mail.com",],
    ["Alba", "alba@mail.com", ],
    ["Mara", "mara@mail.com", ],
    ["Guilherme", "guilherme@mail.com", ],
    ["William", "william@mail.com", ],
  ],
}).render(document.getElementById("wrapper"));

toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: "toast-top-right",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

function criarUsuario() {
  const form = document.getElementById("form1");
  const nome = form.elements["user"].value;
  const senha = form.elements["password"].value;

  if (nome && senha) {
    const lsUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (!lsUsers.find((user) => user.nome === nome)) {
      const user = {
        recados: [],
        nome,
        senha,
      };
      lsUsers.push(user);
      localStorage.setItem("users", JSON.stringify(lsUsers));
      alert("usuario criado com exito");
      window.location.replace("index.html");
    } else {
      alert("Usuário já existente.");
    }
  }
}

function login() {
  // botao de entrar
  const form = document.getElementById("formlogin");
  const nome = form.elements["user"].value;
  const senha = form.elements["password"].value;

  const lsUsers = JSON.parse(localStorage.getItem("users"));
  const requestedUser = lsUsers?.find((user) => user.nome === nome);

  // o sinal de interrogação verifica se o objeto pai é diferente de null, false ou undefined
  if (!!nome && !!senha) {
    if (requestedUser?.senha === senha && requestedUser?.nome === nome) {
      alert("Você está logado!");
      window.location.replace("index3.html");
      localStorage.setItem("loggedUser", JSON.stringify({ nome }));
    } else {
      alert("Erro no login ou usuário nao cadastrado");
    }
  } else {
    alert("Erro no login ou usuário nao cadastrado");
  }
}

function deslogar() {
  localStorage.removeItem("loggedUser");
  window.location.replace("index.html");
}

function verificaUsuarioLogado() {
  if (localStorage.getItem("loggedUser") == null) {
    alert("Você precisa estar logado para acessar essa página");
    window.location.replace("index.html");
  }
}
verificaUsuarioLogado();
