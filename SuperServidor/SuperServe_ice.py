# -*- coding: utf-8 -*-
# **********************************************************************
#
# Copyright (c) 2003-2018 ZeroC, Inc. All rights reserved.
#
# This copy of Ice is licensed to you under the terms described in the
# ICE_LICENSE file included in this distribution.
#
# **********************************************************************
#
# Ice version 3.7.1
#
# <auto-generated>
#
# Generated from file `SuperServe.ice'
#
# Warning: do not edit this file.
#
# </auto-generated>
#

from sys import version_info as _version_info_
import Ice, IcePy

# Start of module SS
_M_SS = Ice.openModule('SS')
__name__ = 'SS'

_M_SS._t_Get = IcePy.defineValue('::SS::Get', Ice.Value, -1, (), False, True, None, ())

if 'GetPrx' not in _M_SS.__dict__:
    _M_SS.GetPrx = Ice.createTempClass()
    class GetPrx(Ice.ObjectPrx):

        def printString(self, s, port, context=None):
            return _M_SS.Get._op_printString.invoke(self, ((s, port), context))

        def printStringAsync(self, s, port, context=None):
            return _M_SS.Get._op_printString.invokeAsync(self, ((s, port), context))

        def begin_printString(self, s, port, _response=None, _ex=None, _sent=None, context=None):
            return _M_SS.Get._op_printString.begin(self, ((s, port), _response, _ex, _sent, context))

        def end_printString(self, _r):
            return _M_SS.Get._op_printString.end(self, _r)

        @staticmethod
        def checkedCast(proxy, facetOrContext=None, context=None):
            return _M_SS.GetPrx.ice_checkedCast(proxy, '::SS::Get', facetOrContext, context)

        @staticmethod
        def uncheckedCast(proxy, facet=None):
            return _M_SS.GetPrx.ice_uncheckedCast(proxy, facet)

        @staticmethod
        def ice_staticId():
            return '::SS::Get'
    _M_SS._t_GetPrx = IcePy.defineProxy('::SS::Get', GetPrx)

    _M_SS.GetPrx = GetPrx
    del GetPrx

    _M_SS.Get = Ice.createTempClass()
    class Get(Ice.Object):

        def ice_ids(self, current=None):
            return ('::Ice::Object', '::SS::Get')

        def ice_id(self, current=None):
            return '::SS::Get'

        @staticmethod
        def ice_staticId():
            return '::SS::Get'

        def printString(self, s, port, current=None):
            raise NotImplementedError("servant method 'printString' not implemented")

        def __str__(self):
            return IcePy.stringify(self, _M_SS._t_GetDisp)

        __repr__ = __str__

    _M_SS._t_GetDisp = IcePy.defineClass('::SS::Get', Get, (), None, ())
    Get._ice_type = _M_SS._t_GetDisp

    Get._op_printString = IcePy.Operation('printString', Ice.OperationMode.Normal, Ice.OperationMode.Normal, False, None, (), (((), IcePy._t_string, False, 0), ((), IcePy._t_string, False, 0)), (), None, ())

    _M_SS.Get = Get
    del Get

# End of module SS
