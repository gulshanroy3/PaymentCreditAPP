import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "../../components/Loader";
import { getInvoiceandVendors, useCreditandPayment } from "../../redux/actions";
import Table from "../../components/Table";
import CreditModal from "./CustomModal/creditModal";
import { createTableData } from "./util";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      invoice: {},
      credit: {},
      selectedColumn: {},
      whichModal: "",
      selectedVendors: {},
    };
  }
  componentDidMount() {
    this.getUSerInvoice();
  }
  getUSerInvoice = () => {
    const { endPonits, id } = this.props;
    let url = `${endPonits.invoice}?id=${id}`;
    let url1 = `${endPonits.vendors}?id=${id}`;
    this.props.getInvoiceandVendors(url, "").then((res) => {
      this.props.getInvoiceandVendors(url1, "").then((res1) => {
        console.log(res1);
        this.storeVenderCredit(res1.vendors.vendors, res.invoice);
      });
    });
  };
  storeVenderCredit = (vendors = [], invoices) => {
    let credit = {};
    vendors.forEach((eachVendor) => {
      credit[eachVendor.vendorId] = eachVendor;
    });
    this.setState({
      loader: false,
      invoice: invoices,
      credit: credit,
    });
  };
  onColumnPayment = (key) => {
    const { credit, invoice } = this.state;
    const { userAccess } = this.props;
    let vendorId = invoice.invoices[key].vendorId;
    let vendorDetails = credit[vendorId];
    let allowCreditAdjustment = userAccess.allowCreditAdjustment;
    console.log(allowCreditAdjustment, vendorDetails, credit, key);
    if (vendorDetails.creditBal !== 0 && allowCreditAdjustment) {
      this.setState({
        selectedColumn: key,
        whichModal: "Credit",
        selectedVendors: vendorDetails,
      });
    } else {
      this.setState({
        selectedColumn: key,
        whichModal: "Payment",
        selectedVendors: vendorDetails,
      });
    }
  };
  handleCredit = (flag) => {
    const { endPonits, id } = this.props;
    const { selectedColumn, selectedVendors, invoice, credit } = this.state;
    const { vendorId, creditBal } = selectedVendors;
    const { amountDue,invoiceId } = invoice.invoices[selectedColumn];
    let url = `${endPonits.credit}`;
    let _invoice = JSON.parse(JSON.stringify(invoice));
    let _credit=JSON.parse(JSON.stringify(credit))
    let remainingAmount =
      parseFloat(amountDue) <= parseFloat(creditBal)
        ? 0
        : parseFloat(amountDue) - parseFloat(creditBal);
        let creditBalance=
        parseFloat(amountDue) >= parseFloat(creditBal)
          ? 0
          : parseFloat(creditBal) - parseFloat(amountDue)
    let data = {
      id,
      vendorId,
      creditBalance,
      remainingAmount,
      invoiceId
    };
    if (flag) {
      ///call payment
      this.props
        .useCreditandPayment(url, data)
        .then((res) => {
          if (res.success) {
            if (remainingAmount > 0) {
              _invoice.invoices[selectedColumn].amountDue = remainingAmount;
              _credit[vendorId].creditBal=creditBalance
              this.setState({
                invoice: _invoice,
                whichModal: "Payment",
                credit:_credit
              });
            } else {
              _invoice.invoices[selectedColumn].amountDue = 0;
              _credit[vendorId].creditBal=creditBalance
              this.setState({
                invoice: _invoice,
                whichModal: "",
                _credit:credit
              });
            }
          } else {
            this.setState({
              whichModal: "",
            });
          }
        })
        .catch((err) => {
          this.setState({
            whichModal: "",
          });
        });
    } else {
      this.setState({
        whichModal: "Payment",
      });
    }
  };
  payment = (flag) => {
    const { endPonits, id } = this.props;
    let url=`${endPonits.payment}`
    const { selectedColumn, invoice } = this.state;
   const{invoiceId}=invoice.invoices[selectedColumn]
    let _invoice = JSON.parse(JSON.stringify(invoice));
    let data={
        id,
        invoiceId,
        remainingAmount:0
    }
    if (flag) {
      ///call payment
      this.props.useCreditandPayment(url,data).then(res=>{
        if(res.success){
            _invoice.invoices[selectedColumn].amountDue = 0;
              this.setState({
                invoice: _invoice,
                whichModal: ""
              });
        }
        else{
            this.setState({
                whichModal: "",
              });
        }
      }) .catch((err) => {
        this.setState({
          whichModal: "",
        });
      });
    } else {
      this.setState({
        whichModal: "",
      });
    }
  };
  render() {
    const {
      loader,
      invoice,
      whichModal,
      selectedVendors,
      selectedColumn,
    } = this.state;
    const { column } = this.props;
    return loader ? (
      <Loader />
    ) : (
      <div>
        <Table
          data={createTableData(invoice.invoices, column)}
          onClick={(data) => this.onColumnPayment(data)}
        />
        {whichModal === "Credit" ? (
          <CreditModal
            onClick={this.handleCredit}
            info={`You have <span>${selectedVendors.creditBal}</span> rs. credit balanace.`}
          />
        ) : whichModal === "Payment" ? (
          <CreditModal
            info={`You have <span>${invoice.invoices[selectedColumn].amountDue}</span> rs. due amount.`}
            onClick={this.payment}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    endPonits: state?.userInfo?.config?.endPonits ?? {},
    column: state?.userInfo?.config?.column ?? {},
    id: state.userInfo._id,
    userAccess: state?.userInfo?.config?.userAccess ?? {},
  };
};
const mapDispathToProps = {
  getInvoiceandVendors,
  useCreditandPayment,
};

export default connect(mapStateToProps, mapDispathToProps)(Home);
