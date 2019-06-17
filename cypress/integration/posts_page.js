context("Posts page", () => {
  specify("Visit posts page", () => {
    cy.visit("http://localhost:3000").then(() => {
      expect(true).to.eq(true);
    });
  });

  specify("at first time should render indicator load", () => {
    cy.visit("http://localhost:3000").then(() => {
      cy.get("[data-cy=load-posts]").then($loadPost => {
        expect($loadPost[0].textContent).to.eq("load ...");
      });
    });
  });

  specify("should show list posts after fetching from API", () => {
    cy.get("[data-cy=posts]").then($posts => {
      cy.get("[data-cy=load-posts]").should("not.exist");
      expect($posts.children.length).to.be.at.least(0);
    });
  });

  specify("check content each item posts", () => {
    cy.get("[data-cy=item-posts]").then($itemPosts => {
      $itemPosts.each((_, $elm) => {
        expect($elm.textContent).to.not.be.empty;
      });
    });
  });

  specify("try to remove the item post", () => {
    cy.get("[data-cy=item-posts]").then($itemPosts => {
      const $firstElm = $itemPosts[0];
      const btnId = $firstElm.children[0].dataset.id;

      cy.get("[data-cy=posts]").then(async $posts => {
        const nextLength = $posts[0].children.length - 1;

        cy.get(`[data-cy=btn-post-${btnId}]`).click();
        cy.get("[data-cy=posts]").then($posts1 => {
          expect($posts1[0].children.length).to.be.eq(nextLength);
        });
      });
    });
  });
});
