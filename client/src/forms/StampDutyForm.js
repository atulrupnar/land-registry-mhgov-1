import React, { Component } from 'react'
// import styled from 'styled-components'
import { Formik, Field } from 'formik'
import {
  Paper,
  // Radio,
  // PaperSubTitle,
  FormikForm,
  FormDetailsContainer,
  TextInput,
  InformTitle,
  StatusPage,
  // NormalFieldsTuple,
  Button,
  ButtonGroup
  // CustomTable,
  // StyledHead
} from '../components'
// import { partyDetails, dutyDetails, DocumentDutyTotal } from '../constants'
import axios from 'axios'
import { API_URL } from '../constants'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import get from 'lodash/get'
import withRouter from 'react-router/withRouter'

/* const ConsiderationWrap = styled.div`
  margin-top: 20px;
  display: flex;
`
const ConsiAmtBox = styled.div`
  flex-basis: 40%;
`
const ConButtonWrap = styled.div`
  flex-basis: 60%;
  text-align: right;
  padding-top: 10px;
`

const TotalPaymentText = styled.h4`
  color: #2f89f5;
  text-align: right;
  font-size: 24px;
  padding: 15px 0;
  font-weight: 500;
`

const HandellingChargesWrap = styled.div`
  & p {
    padding: 5px 0 5px 0;
  }
`

const RadioGroup = styled.div``
const RadioWrap = styled.div`
  margin-top: -20px;
  & label {
    cursor: pointer;
  }
  & > p {
    padding: 10px 0px;
  }
` */

class StampDutyForm extends Component {
  state = {
    isLoading: false
  }
  render() {
    /*     const partyDetailscolumns = [
      {
        Header: <StyledHead>Proprty ID</StyledHead>,
        accessor: 'srNo',
        maxWidth: 100
      },
      {
        Header: <StyledHead>Property Details</StyledHead>,
        accessor: 'partyName',
        maxWidth: 150,
        Cell: props => <span>{props.value}</span>
      },
      {
        Header: <StyledHead>Usage Category</StyledHead>,
        accessor: 'partyType',
        minwidth: 120
      },
      {
        Header: <StyledHead>Location</StyledHead>,
        accessor: 'partyCategory',
        minwidth: 180
      },
      {
        Header: <StyledHead>Action</StyledHead>,
        accessor: 'action',
        maxWidth: 150,
        Cell: props => <Button size="action" shadow={'none'} title="View" radius={'4px'} />
      }
    ]
    const dutyColumns = [
      {
        Header: <StyledHead>Sr.</StyledHead>,
        accessor: 'srNo',
        minWidth: 100
      },
      {
        Header: <StyledHead>Customer </StyledHead>,
        accessor: 'partyName',
        minWidth: 150
      },
      {
        Header: <StyledHead>Chargesss</StyledHead>,
        accessor: 'partyType',
        minwidth: 120
      }
    ]

    const DocumentDutyColumns = [
      {
        Header: <StyledHead>Registration Fee.</StyledHead>,
        accessor: 'srNo',
        minWidth: 100
      },
      {
        Header: <StyledHead>Stamp Duty</StyledHead>,
        accessor: 'partyName',
        minWidth: 150
      },
      {
        Header: <StyledHead>Local Duty</StyledHead>,
        accessor: 'partyType',
        minwidth: 120
      },
      {
        Header: <StyledHead>Total</StyledHead>,
        accessor: 'Total',
        minwidth: 120
      }
    ] */
    const { isLoading } = this.state
    const {
      data,
      match: { params }
    } = this.props
    console.log('STAMO', this.props)
    return (
      <Formik
        enableReinitialize={true}
        initialValues={{
          stampDutyPayment: data.stampDuty || 0,
          selectPartyCategory: '',
          isExecuter: '',
          salutation: '',
          partyFirstName: '',
          partyMiddleName: '',
          partyLastName: '',
          aliasName: '',
          identificationMark1: '',
          identificationMark2: '',
          dateOfBirth: '',
          age: '',
          uid: '',
          identificationTypeID: '',
          identificationDescription: '',
          panForm60: '',
          occupation: '',
          gender: '',
          email: '',
          mobileNo: '',
          presentationExemption: '',
          pinCode: '',
          addressSame: '',
          district: '',
          taluka: '',
          village: '',
          financierName: '',
          city: '',
          branch: '',
          totalValueOfProperty: '',
          totalFinanceAmount: '',
          financeAmountDueNow: '',
          totalSaveAmount: '',
          tokenAmount: ''
        }}
        onSubmit={async (values, { resetForm }) => {
          try {
            this.setState({ isLoading: true })
            await axios.post(`${API_URL}/payStampDuty`, {
              registryId: params.tab3,
              propertyId: Cookies.get('propertyId')
            })
            await this.setState({ isLoading: false })
            await toast.success(`${'Stamp duty paid!'}`, {
              position: toast.POSITION.TOP_CENTER
            })
            this.props.history.push('/dashboard')
          } catch (error) {
            await this.setState({ isLoading: false })
            toast.error(error.response.data.errMessage, {
              position: toast.POSITION.TOP_CENTER
            })
            console.log('ERROR', error)
          }
        }}
        render={formikBag => (
          <FormikForm>
            <Paper
              padding={'0 31px 20px'}
              radius={'0 0 6px 6px'}
              shadow={'0px 2px 6.5px 0.5px rgba(0, 0, 0, 0.06)'}
              margin={'0 95px'}>
              <InformTitle paddingTop="20">Stamp Duty Payment</InformTitle>
              <FormDetailsContainer paddingTop={'10'} flexBasis={'calc(50% - 10px)'}>
                <Field
                  name="stampDutyPayment"
                  render={({ field }) => <TextInput {...field} label="Amount" placeholder={'Will'} required />}
                />

                {get(data, 'status', {}) === 'registry_stamp_duty' && <StatusPage paid />}

                {Cookies.get('email') === get(data, 'owner.email', '') &&
                  get(data, 'status', {}) === 'registry_buyer_pay' && (
                    <Button
                      size={'medium'}
                      width={'150px'}
                      disabled={isLoading}
                      isLoading={isLoading}
                      title="Submit"
                      type="submit"
                    />
                  )}
              </FormDetailsContainer>
            </Paper>

            {/* <ButtonGroup>
              {Cookies.get('email') === get(data, 'owner.email', '') && (
                <Button
                  size={'medium'}
                  width={'150px'}
                  disabled={isLoading}
                  isLoading={isLoading}
                  title="Submit"
                  type="submit"
                />
              )}
            </ButtonGroup> */}
          </FormikForm>
        )}
      />
    )
  }
}

export default withRouter(StampDutyForm)
