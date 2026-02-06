export let clpp;
export let player;

export async function initializeClpp(video) {
  if (!clpp) {
    // This dynamic import fetches the SDK lazily in runtime
    // in the browser.
    clpp = (await import('./sdk.js')).clpp;

    // Install clpp components
    clpp.install(clpp.dash.DashComponent);
    clpp.install(clpp.hls.HlsComponent);
  }

  player = new clpp.Player(video, {
    // license: '',
  }, { containerEl: video.parentElement });
}
