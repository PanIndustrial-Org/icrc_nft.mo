import { resolve } from "node:path";
import { Principal } from "@dfinity/principal";
import { AnonymousIdentity } from "@dfinity/agent";
import { PocketIc, createIdentity, Actor } from "@hadronous/pic";
import { _SERVICE, idlFactory, init } from "../../src/declarations/icrc_nft";
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

const WASM_PATH = resolve(
    __dirname,
    "..",
    "..",
    "icrc_nft.wasm"
);

describe("Todo", () => {
    let pic: PocketIc;
    let actor: Actor<_SERVICE>;
    let canisterId: Principal;

    const alice = createIdentity("superSecretAlicePassword");

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
    });

    afterEach(async () => {
        await pic.tearDown();
    });

    describe("with an anonymous user", () => {
        const identity = new AnonymousIdentity();
        let expectedError: string;

        beforeEach(() => {
            actor.setIdentity(identity);
            expectedError = `Canister ${canisterId.toText()} trapped explicitly: unauthorized`;
        });

        it("should prevent minting an nft", async () => {
            await expect(
                actor.mint({
                    memo: [],
                    tokens: [
                        {
                            token_id: 1n,
                            metadata: {
                                Class: [
                                    {
                                        name: "src",
                                        value: {
                                            Text: "https://images-assets.nasa.gov/image/PIA18249/PIA18249~orig.jpg",
                                        },
                                        immutable: true,
                                    },
                                ],
                            },
                            override: true,
                        },
                    ],
                    created_at_time: [],
                })
            ).rejects.toThrow(expectedError);
        });
    });

    describe("with alice", () => {
        beforeEach(() => {
            actor.setIdentity(alice);
        });

        it("should allow minting an nft", async () => {
            let expectedResponse: SetNFTBatchResponse = {
                Ok: [
                    {
                        result: { Ok: 0n },
                        token_id: 1n,
                    },
                ],
            };
            await expect(
                actor.mint({
                    memo: [],
                    tokens: [
                        {
                            token_id: 1n,
                            metadata: {
                                Class: [
                                    {
                                        name: "src",
                                        value: {
                                            Text: "https://images-assets.nasa.gov/image/PIA18249/PIA18249~orig.jpg",
                                        },
                                        immutable: true,
                                    },
                                ],
                            },
                            override: true,
                        },
                    ],
                    created_at_time: [],
                })
            ).resolves.toEqual(expectedResponse);
        });
    });
});
