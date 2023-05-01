// export const encrypt = (str: string) => {
//     const reverse = str.split('').reverse().join('')
//     return 'encrypted_' + reverse
//   }

//   export const decrypt = (str: string) => {
//     const strip = str.substr(10)  // Let us remove the 'encrypted_' part
//     return strip.split('').reverse().join('')
//   }

//   // exports.encrypt = encrypt
//   // exports.decrypt = decrypt



import bigint from "big-integer"

import * as bcu from 'bigint-crypto-utils'
import crypto from 'crypto'

export class MyRsaPrivatKey {
  
  d: bigint
  n: bigint
  static sign: any

  constructor(d: bigint, n: bigint) {
    this.d = d
    this.n = n
  }

  decrypt(c: bigint): bigint {
    return bcu.modPow(c, this.d, this.n) //=== clear message
  }

  sign(m: bigint): bigint {
    return bcu.modPow(m, this.d, this.n) 
  }
}

export class MyRsaPupblicKey {
  e: bigint
  n: bigint

  constructor(e: bigint, n: bigint) {
    this.e = e
    this.n = n
  }

  encrypt(m: bigint): bigint {
    const c = bcu.modPow(m, this.e, this.n)
    return c
  }

  verify(s: bigint): bigint {
    return bcu.modPow(s, this.e, this.n)
  }

}

export interface KeyPair {
  publicKey: MyRsaPupblicKey
  privateKey: MyRsaPrivatKey
}

export const generateKeys = async function (bitlength: number): Promise<KeyPair> {
  const e = 65537n
  let p: bigint, q: bigint, n: bigint, phi: bigint
  do {
    p = await bcu.prime(bitlength / 2 + 1)
    q = await bcu.prime(bitlength / 2)
    n = p * q
    phi = (p - 1n) * (q - 1n)
  }
  while (bcu.bitLength(n) !== bitlength || (phi % e === 0n))

  const publicKey = new MyRsaPupblicKey(e, n)

  const d = bcu.modInv(e, phi)

  const privateKey = new MyRsaPrivatKey(d, n)

  return {
    publicKey,
    privateKey
  }

}


