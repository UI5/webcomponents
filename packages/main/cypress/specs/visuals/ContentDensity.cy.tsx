import Button from "../../../src/Button.js";
import MultiInput from "../../../src/MultiInput.js";
import Token from "../../../src/Token.js";

describe("Content Density visual", () => {
	it("Button — cozy vs compact", () => {
		cy.mount(
			<table>
				<thead>
					<tr>
						<th>Scenario</th>
						<th>Cozy</th>
						<th>Compact</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>class on host</td>
						<td><Button>Button</Button></td>
						<td><Button class="ui5-content-density-compact">Button</Button></td>
					</tr>
					<tr>
						<td>data-attr on host</td>
						<td><Button>Button</Button></td>
						<td><Button data-ui5-compact-size>Button</Button></td>
					</tr>
					<tr>
						<td>sapUiSizeCompact on host</td>
						<td><Button>Button</Button></td>
						<td><Button class="sapUiSizeCompact">Button</Button></td>
					</tr>
					<tr>
						<td>class on wrapper</td>
						<td><Button>Button</Button></td>
						<td><div class="ui5-content-density-compact"><Button>Button</Button></div></td>
					</tr>
					<tr>
						<td>data-attr on wrapper</td>
						<td><Button>Button</Button></td>
						<td><div data-ui5-compact-size><Button>Button</Button></div></td>
					</tr>
					<tr>
						<td>sapUiSizeCompact on wrapper</td>
						<td><Button>Button</Button></td>
						<td><div class="sapUiSizeCompact"><Button>Button</Button></div></td>
					</tr>
				</tbody>
			</table>
		);
		cy.screenshot();
	});

	it("MultiInput — cozy vs compact", () => {
		cy.mount(
			<table>
				<thead>
					<tr>
						<th>Scenario</th>
						<th>Cozy</th>
						<th>Compact</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>class on host</td>
						<td>
							<MultiInput style="width:20rem">
								<Token slot="tokens" text="Token 1" />
								<Token slot="tokens" text="Token 2" />
							</MultiInput>
						</td>
						<td>
							<MultiInput class="ui5-content-density-compact" style="width:20rem">
								<Token slot="tokens" text="Token 1" />
								<Token slot="tokens" text="Token 2" />
							</MultiInput>
						</td>
					</tr>
					<tr>
						<td>data-attr on host</td>
						<td>
							<MultiInput style="width:20rem">
								<Token slot="tokens" text="Token 1" />
								<Token slot="tokens" text="Token 2" />
							</MultiInput>
						</td>
						<td>
							<MultiInput data-ui5-compact-size style="width:20rem">
								<Token slot="tokens" text="Token 1" />
								<Token slot="tokens" text="Token 2" />
							</MultiInput>
						</td>
					</tr>
					<tr>
						<td>sapUiSizeCompact on host</td>
						<td>
							<MultiInput style="width:20rem">
								<Token slot="tokens" text="Token 1" />
								<Token slot="tokens" text="Token 2" />
							</MultiInput>
						</td>
						<td>
							<MultiInput class="sapUiSizeCompact" style="width:20rem">
								<Token slot="tokens" text="Token 1" />
								<Token slot="tokens" text="Token 2" />
							</MultiInput>
						</td>
					</tr>
					<tr>
						<td>class on wrapper</td>
						<td>
							<MultiInput style="width:20rem">
								<Token slot="tokens" text="Token 1" />
								<Token slot="tokens" text="Token 2" />
							</MultiInput>
						</td>
						<td>
							<div class="ui5-content-density-compact">
								<MultiInput style="width:20rem">
									<Token slot="tokens" text="Token 1" />
									<Token slot="tokens" text="Token 2" />
								</MultiInput>
							</div>
						</td>
					</tr>
					<tr>
						<td>data-attr on wrapper</td>
						<td>
							<MultiInput style="width:20rem">
								<Token slot="tokens" text="Token 1" />
								<Token slot="tokens" text="Token 2" />
							</MultiInput>
						</td>
						<td>
							<div data-ui5-compact-size>
								<MultiInput style="width:20rem">
									<Token slot="tokens" text="Token 1" />
									<Token slot="tokens" text="Token 2" />
								</MultiInput>
							</div>
						</td>
					</tr>
					<tr>
						<td>sapUiSizeCompact on wrapper</td>
						<td>
							<MultiInput style="width:20rem">
								<Token slot="tokens" text="Token 1" />
								<Token slot="tokens" text="Token 2" />
							</MultiInput>
						</td>
						<td>
							<div class="sapUiSizeCompact">
								<MultiInput style="width:20rem">
									<Token slot="tokens" text="Token 1" />
									<Token slot="tokens" text="Token 2" />
								</MultiInput>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		);
		cy.screenshot();
	});
});
