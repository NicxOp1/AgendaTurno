//Descripción
/*Se utiliza un estado global para poder encender y apagar el bot al igual que un interruptor a través de 2 flujos.
El flujo principal (welcomeFlow) solo responderá "Bienvenido", cuando el bot esté encendido.
Si el bot está apagado, simplemente no responderá*/

/* const welcomeFlow = addKeyword(EVENTS.WELCOME)
  .addAction(async (ctx, { state, endFlow }) => {
    const botState = state.getMyState();
      const botIsOff = botState?.off;
    if (botIsOff) return endFlow();
  })
  .addAnswer("Bienvenido");

const turnOnBot = addKeyword("on").addAction(

  async (ctx, { state, endFlow }) => {
    state.update({ off: false });
    return endFlow("El bot fue encendido");
  }
);
const turnOffBot = addKeyword("off").addAction(
  async (ctx, { state, endFlow }) => {
    state.update({ off: true });
    return endFlow("El bot fue apagado");
  }
); */