import { resolve } from "node:path";
import { Principal } from "@dfinity/principal";
// import { AnonymousIdentity } from "@dfinity/agent";
import { PocketIc, createIdentity, Actor } from "@hadronous/pic";
import { _SERVICE } from "../../src/declarations/icrc_nft/icrc_nft.did";
import { idlFactory } from "../../src/declarations/icrc_nft";

const WASM_PATH = resolve(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    ".dfx",
    "local",
    "canisters",
    "icrc_nft",
    "icrc_nft.wasm"
);

describe("Todo", () => {
    let pic: PocketIc;
    let actor: Actor<_SERVICE>;
    let canisterId: Principal;

    // const alice = createIdentity("superSecretAlicePassword");
    const bob = createIdentity("superSecretBobPassword");

    beforeEach(async () => {
        pic = await PocketIc.create();
        const fixture = await pic.setupCanister<_SERVICE>(
            idlFactory,
            WASM_PATH
        );
        actor = fixture.actor;
        canisterId = fixture.canisterId;
    });

    afterEach(async () => {
        await pic.tearDown();
        await pic.upgradeCanister(canisterId, WASM_PATH);
    });

    describe("with an anonymous user", () => {
        // const identity = new AnonymousIdentity();
        // const expectedError =
        //     "Anonymous principals are not allowed to call this method";

        beforeEach(() => {
            actor.setIdentity(bob);
        });

        //     it("should prevent creating a todo", async () => {
        //         await expect(
        //             actor.create_todo({
        //                 text: "Learn Rust",
        //             })
        //         ).rejects.toThrow(expectedError);
        //     });

        //     it("should prevent getting todos", async () => {
        //         await expect(actor.get_todos()).rejects.toThrow(expectedError);
        //     });

        //     it("should prevent updating a todo", async () => {
        //         await expect(
        //             actor.update_todo(1n, {
        //                 text: ["Learn Rust"],
        //                 done: [],
        //             })
        //         ).rejects.toThrow(expectedError);
        //     });

        //     it("should prevent deleting a todo", async () => {
        //         await expect(actor.delete_todo(1n)).rejects.toThrow(expectedError);
        //     });
        // });

        // describe("with alice", () => {
        //     beforeEach(() => {
        //         actor.setIdentity(alice);
        //     });

        //     it("should allow creating a todo", async () => {
        //         const initialGetResponse = await actor.get_todos();
        //         const createResponse = await actor.create_todo({
        //             text: "Learn Rust",
        //         });
        //         const getResponse = await actor.get_todos();

        //         expect(initialGetResponse.todos).toHaveLength(0);
        //         expect(getResponse.todos).toHaveLength(1);
        //         expect(getResponse.todos).toContainEqual({
        //             id: createResponse.id,
        //             text: "Learn Rust",
        //             done: false,
        //         });
        //     });

        //     it("should allow updating a todo", async () => {
        //         const initialGetResponse = await actor.get_todos();
        //         const createResponse = await actor.create_todo({
        //             text: "Learn Rust",
        //         });
        //         const afterCreateGetResponse = await actor.get_todos();
        //         await actor.update_todo(createResponse.id, {
        //             text: ["Learn Rust and WebAssembly"],
        //             done: [],
        //         });
        //         const afterUpdateGetResponse = await actor.get_todos();

        //         expect(initialGetResponse.todos).toHaveLength(0);
        //         expect(afterCreateGetResponse.todos).toHaveLength(1);
        //         expect(afterCreateGetResponse.todos).toContainEqual({
        //             id: createResponse.id,
        //             text: "Learn Rust",
        //             done: false,
        //         });
        //         expect(afterUpdateGetResponse.todos).toHaveLength(1);
        //         expect(afterUpdateGetResponse.todos).toContainEqual({
        //             id: createResponse.id,
        //             text: "Learn Rust and WebAssembly",
        //             done: false,
        //         });
        //     });

        //     it("should allow deleting a todo", async () => {
        //         const initialGetResponse = await actor.get_todos();
        //         const createResponse = await actor.create_todo({
        //             text: "Learn Rust",
        //         });
        //         const afterCreateGetResponse = await actor.get_todos();
        //         await actor.delete_todo(createResponse.id);
        //         const afterDeleteGetResponse = await actor.get_todos();

        //         expect(initialGetResponse.todos).toHaveLength(0);
        //         expect(afterCreateGetResponse.todos).toHaveLength(1);
        //         expect(afterCreateGetResponse.todos).toContainEqual({
        //             id: createResponse.id,
        //             text: "Learn Rust",
        //             done: false,
        //         });
        //         expect(afterDeleteGetResponse.todos).toHaveLength(0);
        //     });
        // });

        // describe("with alice and bob", () => {
        //     it("should return alice's todos to alice and bob's todos to bob", async () => {
        //         actor.setIdentity(alice);
        //         const aliceCreateResponse = await actor.create_todo({
        //             text: "Learn Rust",
        //         });
        //         const aliceAfterCreateGetResponse = await actor.get_todos();

        //         actor.setIdentity(bob);
        //         const bobCreateResponse = await actor.create_todo({
        //             text: "Learn WebAssembly",
        //         });
        //         const bobAfterCreateGetResponse = await actor.get_todos();

        //         expect(aliceAfterCreateGetResponse.todos).toHaveLength(1);
        //         expect(aliceAfterCreateGetResponse.todos).toContainEqual({
        //             id: aliceCreateResponse.id,
        //             text: "Learn Rust",
        //             done: false,
        //         });

        //         expect(bobAfterCreateGetResponse.todos).toHaveLength(1);
        //         expect(bobAfterCreateGetResponse.todos).toContainEqual({
        //             id: bobCreateResponse.id,
        //             text: "Learn WebAssembly",
        //             done: false,
        //         });
        //     });

        //     it("should prevent bob from updating alice's todo", async () => {
        //         actor.setIdentity(alice);
        //         const aliceCreateResponse = await actor.create_todo({
        //             text: "Learn Rust",
        //         });

        //         actor.setIdentity(bob);
        //         await expect(
        //             actor.update_todo(aliceCreateResponse.id, {
        //                 text: ["Learn Rust and WebAssembly"],
        //                 done: [],
        //             })
        //         ).rejects.toThrow(
        //             `Caller with principal ${bob
        //                 .getPrincipal()
        //                 .toText()} does not own todo with id ${
        //                 aliceCreateResponse.id
        //             }`
        //         );
        //     });

        //     it("should prevent bob from deleting alices todo", async () => {
        //         actor.setIdentity(alice);
        //         const aliceCreateResponse = await actor.create_todo({
        //             text: "Learn Rust",
        //         });

        //         actor.setIdentity(bob);
        //         await expect(
        //             actor.delete_todo(aliceCreateResponse.id)
        //         ).rejects.toThrow(
        //             `Caller with principal ${bob
        //                 .getPrincipal()
        //                 .toText()} does not own todo with id ${
        //                 aliceCreateResponse.id
        //             }`
        //         );
        //     });

        //     it("should survive an upgrade", async () => {
        //         actor.setIdentity(alice);
        //         const aliceCreateResponse = await actor.create_todo({
        //             text: "Learn Rust",
        //         });

        //         actor.setIdentity(bob);
        //         const bobCreateResponse = await actor.create_todo({
        //             text: "Learn WebAssembly",
        //         });

        //         await pic.upgradeCanister(canisterId, WASM_PATH);

        //         actor.setIdentity(alice);
        //         const aliceAfterUpgradeGetResponse = await actor.get_todos();

        //         actor.setIdentity(bob);
        //         const bobAfterUpgradeGetResponse = await actor.get_todos();

        //         expect(aliceAfterUpgradeGetResponse.todos).toHaveLength(1);
        //         expect(aliceAfterUpgradeGetResponse.todos).toContainEqual({
        //             id: aliceCreateResponse.id,
        //             text: "Learn Rust",
        //             done: false,
        //         });

        //         expect(bobAfterUpgradeGetResponse.todos).toHaveLength(1);
        //         expect(bobAfterUpgradeGetResponse.todos).toContainEqual({
        //             id: bobCreateResponse.id,
        //             text: "Learn WebAssembly",
        //             done: false,
        //         });
        //     });

        //     it("should survive a reset and stable memory restore", async () => {
        //         actor.setIdentity(alice);
        //         const aliceCreateResponse = await actor.create_todo({
        //             text: "Learn Rust",
        //         });

        //         actor.setIdentity(bob);
        //         const bobCreateResponse = await actor.create_todo({
        //             text: "Learn WebAssembly",
        //         });

        //         const stableMemory = await pic.getStableMemory(canisterId);
        //         await pic.reinstallCode(canisterId, WASM_PATH);
        //         await pic.setStableMemory(canisterId, stableMemory);

        //         actor.setIdentity(alice);
        //         const aliceAfterUpgradeGetResponse = await actor.get_todos();

        //         actor.setIdentity(bob);
        //         const bobAfterUpgradeGetResponse = await actor.get_todos();

        //         expect(aliceAfterUpgradeGetResponse.todos).toHaveLength(1);
        //         expect(aliceAfterUpgradeGetResponse.todos).toContainEqual({
        //             id: aliceCreateResponse.id,
        //             text: "Learn Rust",
        //             done: false,
        //         });

        //         expect(bobAfterUpgradeGetResponse.todos).toHaveLength(1);
        //         expect(bobAfterUpgradeGetResponse.todos).toContainEqual({
        //             id: bobCreateResponse.id,
        //             text: "Learn WebAssembly",
        //             done: false,
        //         });
        //     });
    });
});
