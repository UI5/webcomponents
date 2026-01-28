import Avatar from "../../src/Avatar.js";
import AvatarGroup from "../../src/AvatarGroup.js";
import List from "../../src/List.js";
import ListItemStandard from "../../src/ListItemStandard.js";

describe("Item Navigation Tests", () => {
	it("focus does not cycle", () => {
		cy.mount(<>
			<List>
				<ListItemStandard id="item1">Option 1</ListItemStandard>
				<ListItemStandard id="item2">Option 2</ListItemStandard>
			</List>
		</>);

		cy.get("#item1")
			.realClick();

		cy.get("#item1")
			.should("be.focused");

		cy.realPress("ArrowUp");

		cy.get("#item1")
			.should("be.focused");

		cy.realPress("ArrowDown");

		cy.get("#item2")
			.should("be.focused");

		cy.realPress("ArrowDown");

		cy.get("#item2")
			.should("be.focused");
	});
	it("vertical focus navigation", () => {
		cy.mount(<>
			<List>
				<ListItemStandard id="item3">Option 2.1</ListItemStandard>
				<ListItemStandard id="item4">Option 2.2</ListItemStandard>
				<ListItemStandard id="item5">Option 2.3</ListItemStandard>
			</List>
		</>)

		cy.get("#item3")
			.realClick();

		cy.get("#item3")
			.should("be.focused");

		cy.realPress("ArrowRight");

		cy.get("#item3")
			.should("be.focused");

		cy.realPress("ArrowLeft");

		cy.get("#item3")
			.should("be.focused");

		cy.realPress("ArrowDown");

		cy.get("#item4")
			.should("be.focused");
	});

	it("test PageDown", () => {
		cy.mount(<>
			<List>
				<ListItemStandard id="pageUpDownList_item1">0</ListItemStandard>
				<ListItemStandard>1</ListItemStandard>
				<ListItemStandard>2</ListItemStandard>
				<ListItemStandard id="pageUpDownList_item4">3</ListItemStandard>
				<ListItemStandard>4</ListItemStandard>
				<ListItemStandard id="pageUpDownList_item6">5</ListItemStandard>
				<ListItemStandard>6</ListItemStandard>
				<ListItemStandard>7</ListItemStandard>
				<ListItemStandard>8</ListItemStandard>
				<ListItemStandard>9</ListItemStandard>
				<ListItemStandard id="pageUpDownList_item11">10</ListItemStandard>

				<ListItemStandard>11</ListItemStandard>
				<ListItemStandard>12</ListItemStandard>
				<ListItemStandard>13</ListItemStandard>
				<ListItemStandard>14</ListItemStandard>
				<ListItemStandard id="pageUpDownList_item16">15</ListItemStandard>
				<ListItemStandard>16</ListItemStandard>
				<ListItemStandard>17</ListItemStandard>
				<ListItemStandard>18</ListItemStandard>
				<ListItemStandard>19</ListItemStandard>
				<ListItemStandard>20</ListItemStandard>

				<ListItemStandard>21</ListItemStandard>
				<ListItemStandard>22</ListItemStandard>
				<ListItemStandard>23</ListItemStandard>
				<ListItemStandard>24</ListItemStandard>
				<ListItemStandard id="pageUpDownList_item26">25</ListItemStandard>
				<ListItemStandard>26</ListItemStandard>
				<ListItemStandard>27</ListItemStandard>
				<ListItemStandard>28</ListItemStandard>
				<ListItemStandard>29</ListItemStandard>
				<ListItemStandard>30</ListItemStandard>
			</List>
		</>)

		cy.get("#pageUpDownList_item1")
			.realClick();

		cy.get("#pageUpDownList_item1")
			.should("be.focused");

		cy.realPress("PageDown");

		cy.get("#pageUpDownList_item11")
			.should("be.focused");

		cy.get("#pageUpDownList_item16")
			.realClick();

		cy.get("#pageUpDownList_item16")
			.should("be.focused");

		cy.realPress("PageDown");

		cy.get("#pageUpDownList_item26")
			.should("be.focused");
	});

	it("test PageUp", () => {
		cy.mount(<>
			<List>
				<ListItemStandard id="pageUpDownList_item1">0</ListItemStandard>
				<ListItemStandard>1</ListItemStandard>
				<ListItemStandard>2</ListItemStandard>
				<ListItemStandard id="pageUpDownList_item4">3</ListItemStandard>
				<ListItemStandard>4</ListItemStandard>
				<ListItemStandard id="pageUpDownList_item6">5</ListItemStandard>
				<ListItemStandard>6</ListItemStandard>
				<ListItemStandard>7</ListItemStandard>
				<ListItemStandard>8</ListItemStandard>
				<ListItemStandard>9</ListItemStandard>
				<ListItemStandard id="pageUpDownList_item11">10</ListItemStandard>

				<ListItemStandard>11</ListItemStandard>
				<ListItemStandard>12</ListItemStandard>
				<ListItemStandard>13</ListItemStandard>
				<ListItemStandard>14</ListItemStandard>
				<ListItemStandard id="pageUpDownList_item16">15</ListItemStandard>
				<ListItemStandard>16</ListItemStandard>
				<ListItemStandard>17</ListItemStandard>
				<ListItemStandard>18</ListItemStandard>
				<ListItemStandard>19</ListItemStandard>
				<ListItemStandard>20</ListItemStandard>

				<ListItemStandard>21</ListItemStandard>
				<ListItemStandard>22</ListItemStandard>
				<ListItemStandard>23</ListItemStandard>
				<ListItemStandard>24</ListItemStandard>
				<ListItemStandard id="pageUpDownList_item26">25</ListItemStandard>
				<ListItemStandard>26</ListItemStandard>
				<ListItemStandard>27</ListItemStandard>
				<ListItemStandard>28</ListItemStandard>
				<ListItemStandard>29</ListItemStandard>
				<ListItemStandard>30</ListItemStandard>
			</List>
		</>)

		cy.get("#pageUpDownList_item4")
			.realClick();

		cy.get("#pageUpDownList_item4")
			.should("be.focused");

		cy.realPress("PageUp");

		cy.get("#pageUpDownList_item1")
			.should("be.focused");

		cy.get("#pageUpDownList_item16")
			.realClick();

		cy.get("#pageUpDownList_item16")
			.should("be.focused");

		cy.realPress("PageUp");

		cy.get("#pageUpDownList_item6")
			.should("be.focused");
	});

	it("tests left and right arrow keys in LTR", () => {
		cy.mount(<div dir="ltr">
			<AvatarGroup type="Individual">
				<Avatar size="S" initials="A"></Avatar>
				<Avatar size="S" initials="B"></Avatar>
				<Avatar size="S" initials="C"></Avatar>
			</AvatarGroup>

		</div>);

		cy.get("[ui5-avatar]")
			.eq(0)
			.as("firstAvatar")

		cy.get("[ui5-avatar]")
			.eq(1)
			.as("secondAvatar")

		cy.get("[ui5-avatar]")
			.eq(2)
			.as("thirdAvatar")

		cy.get("@firstAvatar")
			.realClick();

		cy.get("@firstAvatar")
			.should("be.focused");

		cy.realPress("ArrowRight");

		cy.get("@secondAvatar")
			.should("be.focused");

		cy.realPress("ArrowRight");

		cy.get("@thirdAvatar")
			.should("be.focused");

		cy.realPress("ArrowLeft");

		cy.get("@secondAvatar")
			.should("be.focused");

		cy.realPress("ArrowLeft");

		cy.get("@firstAvatar")
			.should("be.focused");
	});

	it("tests left and right arrow keys in RTL", () => {
		cy.mount(<div dir="rtl">
			<AvatarGroup type="Individual">
				<Avatar size="S" initials="A"></Avatar>
				<Avatar size="S" initials="B"></Avatar>
				<Avatar size="S" initials="C"></Avatar>
			</AvatarGroup>

		</div>);

		cy.get("[ui5-avatar]")
			.eq(0)
			.as("firstAvatar")

		cy.get("[ui5-avatar]")
			.eq(1)
			.as("secondAvatar")

		cy.get("[ui5-avatar]")
			.eq(2)
			.as("thirdAvatar")

		cy.get("@firstAvatar")
			.realClick();

		cy.get("@firstAvatar")
			.should("be.focused");

		cy.realPress("ArrowLeft");

		cy.get("@secondAvatar")
			.should("be.focused");

		cy.realPress("ArrowLeft");

		cy.get("@thirdAvatar")
			.should("be.focused");

		cy.realPress("ArrowRight");

		cy.get("@secondAvatar")
			.should("be.focused");

		cy.realPress("ArrowRight");

		cy.get("@firstAvatar")
			.should("be.focused");
	});
});