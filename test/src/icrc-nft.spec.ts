import { resolve } from "node:path";
import { Principal } from "@dfinity/principal";
import { AnonymousIdentity } from "@dfinity/agent";
import { PocketIc, createIdentity, Actor } from "@hadronous/pic";
import { _SERVICE, idlFactory, init } from "../../src/declarations/icrc_nft";
import { SubAccount } from "@dfinity/ledger-icp";
import { IDL } from "@dfinity/candid";
import {
    InitArgs,
    InitArgs__1,
    InitArgs__3,
    SetNFTBatchResponse,
} from "../../src/declarations/icrc_nft/icrc_nft.did";

type Arguments = {
    icrc3_args: InitArgs__1;
    icrc30_args: InitArgs;
    icrc7_args: InitArgs__3;
};
const initArgs: Arguments = {
    icrc30_args: [],
    icrc3_args: [],
    icrc7_args: [],
};

const encodedInitArgs = IDL.encode(init({ IDL }), [initArgs]);

const WASM_PATH = resolve(__dirname, "..", "..", "icrc_nft.wasm");

describe("ICRC NFT", () => {
    let pic: PocketIc;
    let actor: Actor<_SERVICE>;
    let canisterId: Principal;

    const alice = createIdentity("superSecretAlicePassword");
    const bob = createIdentity("superSecretBobPassword");
    let unauthorizedError: string;

    beforeEach(async () => {
        pic = await PocketIc.create();
        const fixture = await pic.setupCanister<_SERVICE>(
            idlFactory,
            WASM_PATH,
            undefined,
            new Uint8Array(encodedInitArgs),
            alice.getPrincipal()
        );
        actor = fixture.actor;
        canisterId = fixture.canisterId;
        unauthorizedError = `Canister ${canisterId.toText()} trapped explicitly: unauthorized`;
    });

    afterEach(async () => {
        await pic.tearDown();
    });

    describe("when minting an nft", () => {
        describe("with anonymous", () => {
            beforeEach(() => {
                actor.setIdentity(new AnonymousIdentity());
            });
            it("should trap", async () => {
                await expect(
                    actor.mint({ owner: bob.getPrincipal(), subaccount: [] })
                ).rejects.toThrow(unauthorizedError);
            });
        });

        describe("with bob", () => {
            beforeEach(() => {
                actor.setIdentity(bob);
            });
            it("should trap", async () => {
                await expect(
                    actor.mint({ owner: bob.getPrincipal(), subaccount: [] })
                ).rejects.toThrow(unauthorizedError);
            });
        });

        describe("with alice", () => {
            beforeEach(() => {
                actor.setIdentity(alice);
            });
            let index = 0n;
            function generateResponse(): SetNFTBatchResponse {
                return {
                    Ok: [
                        {
                            result: { Ok: index },
                            token_id: index++,
                        },
                    ],
                };
            }
            function generateDefaultResponse(): SetNFTBatchResponse {
                return {
                    Ok: [
                        {
                            result: { Ok: 0n },
                            token_id: 0n,
                        },
                    ],
                };
            }

            it("should succeed minting an nft to bob", async () => {
                await expect(
                    actor.mint({ owner: bob.getPrincipal(), subaccount: [] })
                ).resolves.toEqual(generateDefaultResponse());
            });

            it("should succeed minting an nft to bob with a subaccount", async () => {
                await expect(
                    actor.mint({
                        owner: bob.getPrincipal(),
                        subaccount: [SubAccount.fromID(1).toUint8Array()],
                    })
                ).resolves.toEqual(generateDefaultResponse());
            });
            it("should succeed minting nft to bob with a subaccount and to the default subaccount", async () => {
                await expect(
                    actor.mint({
                        owner: bob.getPrincipal(),
                        subaccount: [SubAccount.fromID(1).toUint8Array()],
                    })
                ).resolves.toEqual(generateResponse());
                await expect(
                    actor.mint({
                        owner: bob.getPrincipal(),
                        subaccount: [],
                    })
                ).resolves.toEqual(generateResponse());
            });
        });
    });
});
