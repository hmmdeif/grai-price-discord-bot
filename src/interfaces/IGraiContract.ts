import { BigNumber, Contract } from 'ethers'

export interface IGraiContract extends Contract {
    totalSupply(): Promise<BigNumber>
}
