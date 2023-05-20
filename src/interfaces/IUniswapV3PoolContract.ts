import { BigNumber, Contract } from 'ethers'

export interface PoolInfo {
    sqrtPriceX96: BigNumber,
    tick: number,
}

export interface IUniswapV3PoolContract extends Contract {
    slot0(): Promise<PoolInfo>
}
