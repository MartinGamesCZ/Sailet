export function remoteScript(submodule: string, script: string) {
  return {
    remoteScript: {
      submodule,
      script,
    },
  };
}
