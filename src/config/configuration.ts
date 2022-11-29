export const Config = () => ({
  environment: process.env.NODE_ENV || 'development',
  port: Number(process.env.NODE_PORT) || 3000,
  auth: {
    passwordSalt: process.env.PASSWORD_SALT,
    passwordHash: process.env.PASSWORD_HASH,
    adminUsername: process.env.ADMIN_USERNAME,
  },
  rpcLink: process.env.RPC_URL || 'https://rpc-mumbai.maticvigil.com/',
  ownerAddress: process.env.RPC_URL,
  ownerPrivateKey: process.env.OWNER_PRIVATE_KEY,
  wasteVerificationContractAddress:
    process.env.WASTE_VERIFICATION_CONTRACT_ADDRESS,
});

export { Config as default };
