import { ContractAddress } from './network/addresses'
import { getContract } from './network/contract'
import { getTimeStamp, log, sleep } from './utils/helpers'
import * as grai_abi from './abis/grai_abi.json'
import * as usdc_grai_pool_abi from './abis/uniswapv3pool_abi.json'
import chalk from 'chalk'

import { startup, updatePresence } from './utils/discord'
import { IGraiContract } from './interfaces/IGraiContract'
import { IUniswapV3PoolContract } from './interfaces/IUniswapV3PoolContract'
import { BigNumber } from 'ethers'

const main = async () => {
    const graiContract = getContract(
        ContractAddress.grai,
        grai_abi
    ) as IGraiContract

    const uniswapV3PoolContract = getContract(
        ContractAddress.usdc_grai_pool,
        usdc_grai_pool_abi,
    ) as IUniswapV3PoolContract

    const poolInfo = await uniswapV3PoolContract.slot0()

    // usdc dec 6
    // grai dec 18
    // 18 - 6 = 12
    const graiPrice = poolInfo.sqrtPriceX96.mul(10 ** 12).div(BigNumber.from(2).pow(96)).pow(2).toNumber() / 10 ** 12

    const totalGraiSupply = await graiContract.totalSupply()
    updatePresence(totalGraiSupply, graiPrice)
}

;(async () => {
    log(chalk.bold.bgYellow(`Gravita GRAI Bot Starting`))
    await startup()

    while (true) {
        try {
            log(chalk.bgGray('Updating presence...'))
            await main()

            log(chalk.bgGreen('Loop finished'))
        } catch (e: any) {
            log(chalk.bold.bgRed('ERROR OCCURRED - CHECK LOG'))
            console.error(`${getTimeStamp()} ERROR LOGGED`)
            console.error(e)
        } finally {
            const wait = 10000
            log(chalk.gray(`Waiting for ${wait / 1000} seconds...`))
            await sleep(wait)
        }
    }
})()
