export enum ContractAddress {
    multicall,

    vessel_manager_operations,
    grai,
    usdc_grai_pool,
}

export const addresses: { [key: string]: string } = {
    [ContractAddress.vessel_manager_operations]:
        '0xc49B737fa56f9142974a54F6C66055468eC631d0',
    [ContractAddress.grai]: '0x15f74458aE0bFdAA1a96CA1aa779D715Cc1Eefe4',
    [ContractAddress.multicall]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
    [ContractAddress.usdc_grai_pool]:
        '0x5db3d38bd40c862ba1fdb2286c32a62ab954d36d',
}
