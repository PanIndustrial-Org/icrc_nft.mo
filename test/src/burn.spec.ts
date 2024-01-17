import { AnonymousIdentity } from "@dfinity/agent";
import { PocketIc, createIdentity, Actor } from "@hadronous/pic";
import { _SERVICE } from "../../src/declarations/icrc_nft";
import { deployCanister } from "./setup";

describe("ICRC NFT", () => {
    let pic: PocketIc;
    let actor: Actor<_SERVICE>;

    const alice = createIdentity("superSecretAlicePassword");
    const bob = createIdentity("superSecretBobPassword");

    beforeEach(async () => {
        ({ pic, actor } = await deployCanister({
            deployer: alice.getPrincipal(),
        }));
    });

    afterEach(async () => {
        await pic.tearDown();
    });

    describe("when burning an nft", () => {
        beforeEach(async () => {
            actor.setIdentity(alice);
            // mint nft to bob
            await actor.mint({ owner: bob.getPrincipal(), subaccount: [] });
        });

        describe("from anonymous principal not owning it", () => {
            beforeEach(() => {
                actor.setIdentity(new AnonymousIdentity());
            });
            it("should result in an error when the token exists", async () => {
                await expect(actor.burn(0n)).resolves.toEqual({
                    Err: {
                        Unauthorized: null,
                    },
                });
            });
            it("should result in an error when the token does not exist", async () => {
                await expect(actor.burn(1n)).resolves.toEqual({
                    Ok: [
                        {
                            result: { Err: { NonExistingTokenId: null } },
                            token_id: 1n,
                        },
                    ],
                });
            });
        });

        describe("from self authenticating principal not owning it", () => {
            beforeEach(() => {
                actor.setIdentity(alice);
            });
            it("should result in an error when the token exists", async () => {
                await expect(actor.burn(0n)).resolves.toEqual({
                    Err: {
                        Unauthorized: null,
                    },
                });
            });
            it("should result in an error when the token does not exist", async () => {
                await expect(actor.burn(1n)).resolves.toEqual({
                    Ok: [
                        {
                            result: { Err: { NonExistingTokenId: null } },
                            token_id: 1n,
                        },
                    ],
                });
            });
        });

        describe("from self authenticating principal owning it", () => {
            beforeEach(() => {
                actor.setIdentity(bob);
            });
            it("should suceed when the token exists", async () => {
                await expect(actor.burn(0n)).resolves.toEqual({
                    Ok: [
                        {
                            result: { Ok: 1n },
                            token_id: 0n,
                        },
                    ],
                });
            });
            it("should result in an error when the token does not exist", async () => {
                await expect(actor.burn(1n)).resolves.toEqual({
                    Ok: [
                        {
                            result: { Err: { NonExistingTokenId: null } },
                            token_id: 1n,
                        },
                    ],
                });
            });
        });
    });
});
