"use strict";

const selectorDuracion = document.querySelector("#duracion");
const minutosElegidos = document.querySelector("#minutos");
const indicadorTiempo = document.querySelector("#tiempo");
const horaLocal = document.querySelector("#hora-local");
const botonAccion = document.querySelector("#accion");
const botonReiniciar = document.querySelector("#reiniciar");
const mensajeEstado = document.querySelector("#estado");
const indicadorDescansos = document.querySelector("#descansos");
const claveGuardado = "el-cafe-del-tiempo";
const formatoHora = new Intl.DateTimeFormat("es-ES", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

let duracion = Number(selectorDuracion.value) * 60_000;
let restante = duracion;
let fin = 0;
let estado = "listo";
let descansos = 0;

function guardar() {
  storeItem(claveGuardado, { duracion, restante, fin, estado, descansos });
}

function restaurar() {
  const guardado = getItem(claveGuardado);
  if (!guardado) return;

  ({ duracion, restante, fin, estado, descansos } = guardado);
  selectorDuracion.value = String(duracion / 60_000);
  minutosElegidos.textContent = selectorDuracion.value;
  indicadorDescansos.textContent = descansos;
  cambiarEstado(estado);
}

function mostrarTiempo() {
  const segundos = Math.ceil(restante / 1000);
  const formato = (valor) => String(valor).padStart(2, "0");
  const texto = `${formato(Math.floor(segundos / 60))}:${formato(segundos % 60)}`;
  if (indicadorTiempo.textContent !== texto)
    indicadorTiempo.textContent = texto;
  nivelCafe = restante / duracion;
}

function cambiarEstado(nuevoEstado) {
  estado = nuevoEstado;
  botonAccion.textContent = {
    listo: "Iniciar",
    activo: "Pausar",
    pausado: "Reanudar",
    completado: "Iniciar",
  }[estado];
  selectorDuracion.disabled = estado === "activo" || estado === "pausado";
  mensajeEstado.textContent = {
    listo: "",
    activo: "Descanso en marcha",
    pausado: "Descanso en pausa",
    completado: "Descanso completado",
  }[estado];
}

function actualizar() {
  const ahora = Date.now();
  const hora = formatoHora.format(ahora);
  if (horaLocal.textContent !== hora) {
    horaLocal.textContent = hora;
    horaLocal.dateTime = hora;
  }

  if (estado === "activo") {
    restante = Math.min(duracion, Math.max(0, fin - ahora));
    if (restante === 0) {
      descansos++;
      indicadorDescansos.textContent = descansos;
      cambiarEstado("completado");
      guardar();
    }
  }
  mostrarTiempo();
}

function reiniciar() {
  duracion = Number(selectorDuracion.value) * 60_000;
  minutosElegidos.textContent = selectorDuracion.value;
  restante = duracion;
  fin = 0;
  cambiarEstado("listo");
  mostrarTiempo();
  guardar();
}

botonAccion.addEventListener("click", () => {
  if (estado === "activo") {
    actualizar();
    if (estado === "activo") {
      cambiarEstado("pausado");
      guardar();
    }
    return;
  }
  if (estado === "completado") restante = duracion;
  fin = Date.now() + restante;
  cambiarEstado("activo");
  guardar();
  actualizar();
});

selectorDuracion.addEventListener("input", reiniciar);
botonReiniciar.addEventListener("click", reiniciar);
function iniciarTemporizador() {
  restaurar();
  actualizar();
  setInterval(actualizar, 100);
}
