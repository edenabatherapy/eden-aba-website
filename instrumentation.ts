export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { assertInsuranceProductionReady } = await import("@/lib/insurance/config");
    assertInsuranceProductionReady();
  }
}
