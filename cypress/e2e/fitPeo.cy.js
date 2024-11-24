///<reference types = "cypress"/>

describe("FitPeo", () => {
  it("First test case", () => {
    //1. Open the web browser and navigate to FitPeo Homepage.
    cy.visit("/");
    cy.url().should("contain", "/");

    //2. Navigate to the Revenue Calculator Page:
    //From the homepage, navigate to the Revenue Calculator Page.
    cy.get(".satoshi ").contains("Revenue Calculator").click();
    cy.url().should("contain", "revenue-calculator");

    //3. Scroll Down to the Slider section:
    // Scroll down the page until the revenue calculator slider is visible.
    cy.get(".MuiSlider-thumb").scrollIntoView().should("be.visible");
  

    /*4. Adjust the Slider:
    Adjust the slider to set its value to 820. 
    we’ve highlighted the slider in red color, Once the slider is moved the bottom text field value should be updated to 820
    */
    cy.get('.MuiSlider-root').then(($slider) => {
      const sliderWidth = $slider.width(); 
      const sliderStart = $slider.offset().left; 
      cy.log(sliderWidth,'slider width');
      cy.log(sliderStart,'slider strat')
      const min = 0; 
      const max = 2000; 
      const targetValue = 820;

      const clientX = sliderStart + ((targetValue - min) / (max - min)) * sliderWidth;

     
      cy.get('.MuiSlider-thumb')
        .trigger('mousedown', { button: 0 })
        .trigger('mousemove', { clientX })
        .trigger('mouseup');

      // Verify the slider value
      cy.get('.MuiSlider-thumb input').should('have.value', `${targetValue}`);
    });

    /*
    5. Update the Text Field:
     Click on the text field associated with the slider.
     Enter the value 560 in the text field. Now the slider also should change accordingly 
    */
    cy.get(".MuiInputBase-input").clear().type(560);
    cy.get(".MuiInputBase-input").should("have.value", "560");

    /* 6. Validate Slider Value:
    Ensure that when the value 560 is entered in the text field, the slider's position is updated to reflect the value 560.\
*/

    cy.get(".MuiSlider-thumb")
      .children("input")
      .invoke("val")
      .then((value) => {
        expect(parseInt(value)).eql(560);
      });

    /*7. Select CPT Codes:
       Scroll down further and select the checkboxes for CPT-99091, CPT-99453, CPT-99454, and CPT-99474.
      */
    let cptCodeList = ["CPT-99091", "CPT-99453", "CPT-99454", "CPT-99474"];
    cy.get("span.MuiCheckbox-root")
      .parent()
      .parent()
      .children("p.MuiTypography-body1")
      .each(($ele, index) => {
        const cptCode = $ele.text();
        for (const cpt of cptCodeList) {
          if (cpt === cptCode) {
            cy.get("span.MuiCheckbox-root").eq(index).click();
          }
        }
      });

    /*8. Validate Total Recurring Reimbursement:
       9. Verify that the header displaying Total Recurring Reimbursement for all Patients Per Month: shows the value $110700.
*/
    cy.get("header.MuiPaper-elevation")
      .contains("Total Recurring Reimbursement for all Patients Per Month:")
      .children("p")
      .then(($ele) => {
        const t = $ele.text();
        const total = t.replace("$", "");
        expect(parseInt(total)).eqls(75600); // When I enter the value 560 in the text field, the Total Recurring Reimbursement for All Patients Per Month displays as 75,600.
      });
  });
});
